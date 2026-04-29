import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import Event from '../../backend/models/Event.js';
import GameSession from '../../backend/models/GameSession.js';

dotenv.config();

const parseArgs = () => {
  const args = process.argv.slice(2);
  const getArg = (key, fallback = null) => {
    const idx = args.findIndex((arg) => arg === `--${key}`);
    if (idx === -1 || idx === args.length - 1) return fallback;
    return args[idx + 1];
  };

  const gameId = getArg('gameId', 'friend-or-foe');
  const fromRaw = getArg('from');
  const toRaw = getArg('to');
  const outputDir = getArg('outDir', 'reports');
  /** `all` = local dev + prod events; use `production` for resume-ready numbers only. */
  const env = getArg('env', 'all');

  const now = new Date();
  const defaultFrom = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  return {
    gameId,
    from: fromRaw ? new Date(fromRaw) : defaultFrom,
    to: toRaw ? new Date(toRaw) : now,
    outputDir,
    env,
  };
};

const safeRate = (num, den) => (den > 0 ? num / den : 0);

const round = (value, digits = 4) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

const buildEnvironmentMatch = (env) => {
  if (env === 'all') return {};
  if (env === 'production' || env === 'development') {
    return { environment: env };
  }
  throw new Error('Invalid --env (use all, production, or development)');
};

const run = async () => {
  const { gameId, from, to, outputDir, env } = parseArgs();

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required in environment');
  }
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    throw new Error('Invalid --from or --to date format');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const envMatch = buildEnvironmentMatch(env);
  const eventFilter = {
    gameId,
    ...envMatch,
    timestamp: { $gte: from, $lt: to },
  };
  const sessionFilter = {
    gameId,
    startedAt: { $gte: from, $lt: to },
  };

  const [starts, completeEvents, sessions, decisionRows] = await Promise.all([
    Event.countDocuments({ ...eventFilter, eventType: 'session_start' }),
    Event.countDocuments({ ...eventFilter, eventType: 'session_complete' }),
    GameSession.find(sessionFilter).lean(),
    Event.find(
      gameId === 'friend-or-foe'
        ? { ...eventFilter, eventType: 'decision_submitted' }
        : { ...eventFilter, eventType: 'verdict_submitted' },
      { metadata: 1, stepNumber: 1 },
    ).lean(),
  ]);

  const distinctSessionsWithStart = await Event.distinct('sessionId', {
    ...eventFilter,
    eventType: 'session_start',
  });

  const completes = Math.max(
    completeEvents,
    sessions.filter((s) => s.completed).length,
  );

  const durations = sessions
    .map((s) => s.durationSec)
    .filter((v) => typeof v === 'number' && v > 0);

  /** Prefer rollup rows in `gamesessions`; if empty/outdated, fall back to raw `events`. */
  const avgSessionDurationFromSessions =
    durations.length > 0
      ? durations.reduce((acc, n) => acc + n, 0) / durations.length
      : 0;

  const durationAvgFromCompleteEvents = await Event.aggregate([
    {
      $match: {
        ...eventFilter,
        eventType: 'session_complete',
        'metadata.durationSec': { $exists: true, $gt: 0 },
      },
    },
    { $group: { _id: null, avgDur: { $avg: '$metadata.durationSec' } } },
  ]);
  const avgSessionDurationFromEvents =
    typeof durationAvgFromCompleteEvents?.[0]?.avgDur === 'number'
      ? durationAvgFromCompleteEvents[0].avgDur
      : 0;

  const avgDurationSecFinal =
    avgSessionDurationFromSessions > 0
      ? avgSessionDurationFromSessions
      : avgSessionDurationFromEvents;

  const sessionCountForSample = Math.max(
    sessions.length,
    distinctSessionsWithStart.length,
  );

  let correctCount = 0;
  let fakeReviewed = 0;
  let fakeAccepted = 0;
  let legitReviewed = 0;
  let legitRejected = 0;
  let totalSelectedFlags = 0;
  for (const row of decisionRows) {
    if (row?.metadata?.isCorrect === true) correctCount += 1;
    if (typeof row?.metadata?.selectedFlagCount === 'number') {
      totalSelectedFlags += row.metadata.selectedFlagCount;
    }
    if (row?.metadata?.profileType === 'fake') {
      fakeReviewed += 1;
      if (row?.metadata?.decision === 'accept') fakeAccepted += 1;
    }
    if (row?.metadata?.profileType === 'legit') {
      legitReviewed += 1;
      if (row?.metadata?.decision === 'reject') legitRejected += 1;
    }
  }

  const dropoffMap = {};
  for (const row of decisionRows) {
    const step = row?.stepNumber;
    if (typeof step !== 'number') continue;
    dropoffMap[step] = (dropoffMap[step] || 0) + 1;
  }

  const baseReport = {
    generatedAt: new Date().toISOString(),
    gameId,
    environmentScope: env,
    from: from.toISOString(),
    to: to.toISOString(),
    starts,
    completes,
    completionRate: round(safeRate(completes, starts)),
    avgSessionDurationSec: round(avgDurationSecFinal, 2),
    avgSessionDurationSource:
      avgSessionDurationFromSessions > 0
        ? 'gamesessionsrollup'
        : avgSessionDurationFromEvents > 0
          ? 'session_complete_events'
          : 'none',
    gamesessionsDocumentCountInRange: sessions.length,
    distinctSessionIdsFromStarts: distinctSessionsWithStart.length,
    dropoffByStep: dropoffMap,
    sampleSize: {
      sessionCount: sessionCountForSample,
      evaluationEventCount: decisionRows.length,
    },
  };

  let report = baseReport;
  if (gameId === 'friend-or-foe') {
    report = {
      ...baseReport,
      totalDecisions: decisionRows.length,
      decisionAccuracyRate: round(safeRate(correctCount, decisionRows.length)),
      falseAcceptRate: round(safeRate(fakeAccepted, fakeReviewed)),
      falseRejectRate: round(safeRate(legitRejected, legitReviewed)),
      avgFlagsSelectedPerProfile: round(safeRate(totalSelectedFlags, decisionRows.length), 2),
    };
  } else {
    const riskySessionsRows = await Event.aggregate([
      { $match: { ...eventFilter, eventType: 'risky_cta_click' } },
      { $group: { _id: '$sessionId' } },
      { $count: 'total' },
    ]);
    const riskySessions = riskySessionsRows?.[0]?.total || 0;

    report = {
      ...baseReport,
      totalVerdicts: decisionRows.length,
      verdictAccuracyRate: round(safeRate(correctCount, decisionRows.length)),
      riskyCtaClickRate: round(safeRate(riskySessions, starts)),
    };
  }

  const monthLabel = `${from.getUTCFullYear()}-${String(from.getUTCMonth() + 1).padStart(2, '0')}`;
  const targetDir = path.resolve(outputDir, monthLabel);
  await fs.mkdir(targetDir, { recursive: true });
  const outPath = path.join(targetDir, `${gameId}-metrics.json`);
  await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`Metrics written: ${outPath}`);
  if (starts === 0 && env === 'production') {
    console.warn(
      'No production events in range. Local Vite dev emits environment=development — rerun with: npm run metrics:game -- --env all',
    );
  } else if (starts === 0) {
    console.warn(
      'No session_start events found. Confirm the `events` collection in MongoDB and that /api/telemetry was reachable while you played (frontend dev server proxies /api).',
    );
  }
  console.log(JSON.stringify(report, null, 2));
};

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
