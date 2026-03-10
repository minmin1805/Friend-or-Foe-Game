import crypto from "crypto";
import mongoose from "mongoose";
import Player from "../models/player.js";

export const createPlayer = async (req, res) => {
    try {
        
        const {username} = req.body;

        if(!username || typeof username !== 'string' || username.trim() == '') {
            return res.status(400).json({error: 'Username is required'});
        }

        const createdSessionId = crypto.randomUUID();

        const createdPlayer = await Player.create({
            sessionId: createdSessionId,
            name: username,
        });

        if(!createdPlayer) {
            return res.status(500).json({error: 'Failed to create player'});
        }

        return res.status(201).json({
            id: createdPlayer.sessionId,
            name: createdPlayer.name,
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const updatePlayer = async (req, res) => {
    try {
        
        const {id} = req.params;

        const {score, correctDecisions, badge, completedAt} = req.body;

        if(!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid player ID'});
        }

        const updateData = {};

        if(typeof score === 'number') {
            updateData.score = score;
        }

        if(typeof correctDecisions === 'number') {
            updateData.correctDecisions = correctDecisions;
        }
        
        if(typeof badge === 'string' && badge.trim() !== '') {
            updateData.badge = badge;
        }

        if(completedAt && typeof completedAt === 'string') {
            updateData.completedAt = new Date(completedAt);
        }
        
        // now we update the player
        const updatedPlayer = await Player.findByIdAndUpdate(id, 
            {
                $set: updateData
            },
            {new: true, runValidators: true}
        );

        if(!updatedPlayer) {
            return res.status(404).json({error: "Player not found"});
        }

        res.status(200).json({updatedPlayer});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const getLeaderboard = async (req, res) => {
    try {
        
        const limit = Math.min(parseInt(req.query.limit) || 4, 20);

        const foundPlayers = await Player.find({
            completedAt: {$ne: null}
        })
        .sort({score: -1})
        .limit(limit)
        .select('name score completedAt badge')
        .lean();

        res.status(200).json({players: foundPlayers});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}