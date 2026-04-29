export const GAME_IDS = ['friend-or-foe', 'inbox-inspector'];

export const EVENT_TYPES = [
  'session_start',
  'profile_opened',
  'flag_toggled',
  'decision_submitted',
  'verdict_submitted',
  'tool_reveal',
  'risky_cta_click',
  'reply_graded',
  'feedback_viewed',
  'session_complete',
];

const eventMetadataRules = {
  session_start: [],
  profile_opened: ['profileId', 'profileNumber'],
  flag_toggled: ['flagKey', 'isFlagged'],
  decision_submitted: [
    'profileId',
    'decision',
    'isCorrect',
    'correctDecision',
    'profileType',
    'selectedFlagCount',
    'spottedFlagCount',
    'missedFlagCount',
    'incorrectFlagCount',
  ],
  verdict_submitted: ['caseId', 'caseNumber', 'verdict', 'correctVerdict', 'isCorrect'],
  tool_reveal: ['caseId', 'caseNumber', 'toolName'],
  risky_cta_click: ['caseId', 'caseNumber', 'ctaKey'],
  reply_graded: ['caseId', 'caseNumber', 'replySafetyBand', 'sharesCredentials'],
  feedback_viewed: ['caseId', 'caseNumber'],
  session_complete: ['completed', 'finalScore', 'stepsCompleted', 'durationSec'],
};

export const getAllowedMetadataKeys = (eventType) => {
  return eventMetadataRules[eventType] || [];
};

export const sanitizeMetadata = (eventType, metadata) => {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return {};
  }

  const allowedKeys = getAllowedMetadataKeys(eventType);
  const cleaned = {};

  for (const key of allowedKeys) {
    if (Object.prototype.hasOwnProperty.call(metadata, key)) {
      cleaned[key] = metadata[key];
    }
  }

  return cleaned;
};
