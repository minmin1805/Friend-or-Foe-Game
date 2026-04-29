import mongoose from 'mongoose';
import { GAME_IDS } from '../telemetry/eventSchema.js';

const gameSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: null,
    },
    gameId: {
      type: String,
      required: true,
      enum: GAME_IDS,
      trim: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    durationSec: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    stepsCompleted: {
      type: Number,
      default: 0,
    },
    totalSteps: {
      type: Number,
      default: 0,
    },
    finalScore: {
      type: Number,
      default: 0,
    },
    finalBadge: {
      type: String,
      default: '',
      trim: true,
    },
    version: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true },
);

gameSessionSchema.index({ gameId: 1, completed: 1, endedAt: -1 });
gameSessionSchema.index({ playerId: 1, startedAt: -1 });

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
