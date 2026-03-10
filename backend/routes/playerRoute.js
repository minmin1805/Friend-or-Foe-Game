import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    correctDecisions: {
        type: Number,
        default: 0
    },
    badge: {
        type: String,
        default: ''
    },
    completedAt: {
        type: Data,
        default: null,
    }
}, {timestamps: true});

const Player = mongoose.model('Player', playerSchema);

export default Player;