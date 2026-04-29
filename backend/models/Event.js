import mongoose from 'mongoose';
import { EVENT_TYPES, GAME_IDS } from '../telemetry/eventSchema.js';

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
      enum: GAME_IDS,
      trim: true,
    },
    sessionId: {
      type: String,
      required: true,
      trim: true,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: null,
    },
    eventType: {
      type: String,
      required: true,
      enum: EVENT_TYPES,
      trim: true,
    },
    stepId: {
      type: String,
      default: null,
      trim: true,
    },
    stepNumber: {
      type: Number,
      default: null,
    },
    appVersion: {
      type: String,
      default: '',
      trim: true,
    },
    environment: {
      type: String,
      default: 'production',
      trim: true,
    },
    source: {
      type: String,
      default: 'web',
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

eventSchema.index({ gameId: 1, eventType: 1, timestamp: -1 });
eventSchema.index({ sessionId: 1, timestamp: 1 });
eventSchema.index({ playerId: 1, timestamp: -1 });
eventSchema.index({ gameId: 1, stepNumber: 1, timestamp: -1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
