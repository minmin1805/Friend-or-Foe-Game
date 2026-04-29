import crypto from 'crypto';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import GameSession from '../models/GameSession.js';
import { EVENT_TYPES, GAME_IDS, sanitizeMetadata } from '../telemetry/eventSchema.js';

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const normalizeEvent = (rawEvent) => {
  if (!isPlainObject(rawEvent)) {
    throw new Error('Event payload must be an object');
  }

  const eventType = rawEvent.eventType;
  const gameId = rawEvent.gameId;

  if (!EVENT_TYPES.includes(eventType)) {
    throw new Error('Invalid eventType');
  }

  if (!GAME_IDS.includes(gameId)) {
    throw new Error('Invalid gameId');
  }

  if (!rawEvent.sessionId || typeof rawEvent.sessionId !== 'string') {
    throw new Error('sessionId is required');
  }

  let playerId = null;
  if (rawEvent.playerId && mongoose.Types.ObjectId.isValid(rawEvent.playerId)) {
    playerId = rawEvent.playerId;
  }

  let timestamp = new Date();
  if (rawEvent.timestamp) {
    const candidate = new Date(rawEvent.timestamp);
    if (!Number.isNaN(candidate.getTime())) {
      timestamp = candidate;
    }
  }

  return {
    eventId: typeof rawEvent.eventId === 'string' && rawEvent.eventId.trim() !== ''
      ? rawEvent.eventId.trim()
      : crypto.randomUUID(),
    timestamp,
    gameId,
    sessionId: rawEvent.sessionId.trim(),
    playerId,
    eventType,
    stepId: typeof rawEvent.stepId === 'string' ? rawEvent.stepId.trim() : null,
    stepNumber: typeof rawEvent.stepNumber === 'number' ? rawEvent.stepNumber : null,
    appVersion: typeof rawEvent.appVersion === 'string' ? rawEvent.appVersion : '',
    environment: typeof rawEvent.environment === 'string' ? rawEvent.environment : 'production',
    source: typeof rawEvent.source === 'string' ? rawEvent.source : 'web',
    metadata: sanitizeMetadata(eventType, rawEvent.metadata),
  };
};

const upsertSessionSummary = async (normalizedEvent) => {
  const baseSetOnInsert = {
    sessionId: normalizedEvent.sessionId,
    gameId: normalizedEvent.gameId,
    playerId: normalizedEvent.playerId || null,
    startedAt: normalizedEvent.timestamp,
  };

  if (normalizedEvent.eventType === 'session_start') {
    await GameSession.updateOne(
      { sessionId: normalizedEvent.sessionId },
      {
        $setOnInsert: baseSetOnInsert,
        $set: {
          gameId: normalizedEvent.gameId,
          playerId: normalizedEvent.playerId || null,
          version: normalizedEvent.appVersion || '',
        },
      },
      { upsert: true },
    );
    return;
  }

  if (normalizedEvent.eventType === 'session_complete') {
    const metadata = normalizedEvent.metadata || {};
    const endedAt = normalizedEvent.timestamp;
    const startedAt = metadata.startedAt ? new Date(metadata.startedAt) : null;
    const durationSec = typeof metadata.durationSec === 'number'
      ? metadata.durationSec
      : startedAt && !Number.isNaN(startedAt.getTime())
        ? Math.max(0, Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000))
        : 0;

    await GameSession.updateOne(
      { sessionId: normalizedEvent.sessionId },
      {
        $setOnInsert: baseSetOnInsert,
        $set: {
          gameId: normalizedEvent.gameId,
          playerId: normalizedEvent.playerId || null,
          endedAt,
          durationSec,
          completed: metadata.completed !== false,
          stepsCompleted: typeof metadata.stepsCompleted === 'number' ? metadata.stepsCompleted : 0,
          totalSteps: typeof metadata.totalSteps === 'number' ? metadata.totalSteps : 0,
          finalScore: typeof metadata.finalScore === 'number' ? metadata.finalScore : 0,
          finalBadge: typeof metadata.finalBadge === 'string' ? metadata.finalBadge : '',
          version: normalizedEvent.appVersion || '',
        },
      },
      { upsert: true },
    );
  }
};

export const ingestTelemetryEvents = async (req, res) => {
  try {
    const inputEvents = Array.isArray(req.body?.events) ? req.body.events : [req.body];

    if (!inputEvents.length) {
      return res.status(400).json({ error: 'No telemetry events provided' });
    }

    const normalizedEvents = inputEvents.map(normalizeEvent);

    const writes = normalizedEvents.map((eventDoc) => ({
      updateOne: {
        filter: { eventId: eventDoc.eventId },
        update: { $setOnInsert: eventDoc },
        upsert: true,
      },
    }));

    const writeResult = await Event.bulkWrite(writes, { ordered: false });

    await Promise.all(
      normalizedEvents.map((eventDoc) => upsertSessionSummary(eventDoc)),
    );

    return res.status(202).json({
      received: normalizedEvents.length,
      inserted: writeResult.upsertedCount || 0,
      duplicates: normalizedEvents.length - (writeResult.upsertedCount || 0),
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Telemetry ingestion failed',
      details: error.message,
    });
  }
};
