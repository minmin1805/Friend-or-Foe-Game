import React, { createContext, useContext, useReducer, useCallback } from 'react'
import * as playerService from '../services/playerService'
import profilesData from '../data/profiles.json'

const PROFILES = profilesData

// Scoring constants (tune later)
const BASE_POINTS_CORRECT = 500
const BONUS_PER_FLAG = 50
const PENALTY_PER_INCORRECT_FLAG = 10

const FriendOrFoeContext = createContext(null)

/** Notebook reminder for a missed red-flag key (uses profile data when available). */
function missedFlagReminderText(profile, elementKey) {
  const rf = (profile?.redFlags || []).find((r) => r.elementKey === elementKey)
  if (rf?.reason) return rf.reason
  if (elementKey?.startsWith?.('post_')) {
    return 'Review that activity post for risky language (DMs, meet-ups, video chat, or moving to other apps).'
  }
  if (elementKey === 'username') {
    return 'Check whether the username looks generic, random, or like a bot/scam account.'
  }
  if (elementKey === 'followers') {
    return 'Compare followers vs following — a huge imbalance can be a red flag.'
  }
  return `Review this part of the profile (${elementKey}).`
}

function friendOrFoeReducer(state, action) {
  switch (action.type) {
    case 'CREATE_PLAYER': {
      return {
        ...state,
        playerId: action.payload.id,
        playerName: action.payload.name,
        sessionId: action.payload.sessionId ?? null,
        gameStartedAt: Date.now(),
      }
    }
    case 'SET_CURRENT_PROFILE_BY_ID': {
      const { profileId } = action.payload
      const index = PROFILES.findIndex((p) => p.profileId === profileId)
      if (index === -1) return state
      return {
        ...state,
        currentProfileIndex: index,
      }
    }
    case 'SET_FLAG': {
      const { profileIndex, elementKey } = action.payload
      const current = state.flaggedElements[profileIndex] ?? []
      const set = new Set(current)
      if (set.has(elementKey)) set.delete(elementKey)
      else set.add(elementKey)
      return {
        ...state,
        flaggedElements: {
          ...state.flaggedElements,
          [profileIndex]: Array.from(set),
        },
      }
    }
    case 'CLEAR_FLAGS': {
      const { profileIndex } = action.payload
      const next = { ...state.flaggedElements }
      delete next[profileIndex]
      return { ...state, flaggedElements: next }
    }
    case 'SUBMIT_DECISION': {
      const {
        profileIndex,
        decision,
        roundPoints,
        correct,
        explanation,
        spottedFlags,
        missedFlags,
        usedDoubleThisRound,
        willUnlockDouble,
      } = action.payload
      const decisions = [...(state.decisions || [])]
      decisions[profileIndex] = decision

      const newScore = state.score + roundPoints

      // Reference note entry for this profile (for notebook popup)
      const profile = PROFILES[profileIndex]
      const missedKeys = missedFlags ?? []
      const missedReminders = missedKeys.map((key) => missedFlagReminderText(profile, key))
      const noteEntry = {
        profileId: profile?.profileId ?? String(profileIndex + 1),
        label: profile?.displayName || profile?.username || `Profile ${profileIndex + 1}`,
        missedKeys: missedKeys,
        missedReminders,
      }

      return {
        ...state,
        score: newScore,
        correctDecisions: state.correctDecisions + (correct ? 1 : 0),
        decisions,
        doubleForNextAvailable: state.doubleForNextAvailable || willUnlockDouble,
        doubleForNextActive: usedDoubleThisRound ? false : state.doubleForNextActive,
        doubleForNextUsed: state.doubleForNextUsed || usedDoubleThisRound,
        referenceNotes: [...state.referenceNotes, noteEntry],
        pendingFeedback: {
          correct,
          roundPoints,
          totalScore: newScore,
          explanation,
          decision,
          spottedFlags: spottedFlags ?? [],
          missedFlags: missedFlags ?? [],
          profile: PROFILES[profileIndex] ?? null,
        },
      }
    }
    case 'ACTIVATE_DOUBLE_FOR_NEXT': {
      if (!state.doubleForNextAvailable || state.doubleForNextUsed) {
        return state
      }
      return {
        ...state,
        doubleForNextActive: true,
      }
    }
    case 'GO_TO_NEXT_PROFILE': {
      // For the \"choose any profile\" flow, we only clear feedback here.
      // Game completion can later be derived from decisions length vs profiles length.
      return {
        ...state,
        pendingFeedback: null,
      }
    }
    case 'RESET_GAME': {
      return {
        ...initialState,
        playerId: state.playerId,
        playerName: state.playerName,
        sessionId: state.sessionId,
      }
    }
    default:
      return state
  }
}

const initialState = {
  playerId: null,
  playerName: null,
  sessionId: null,
  currentProfileIndex: 0,
  score: 0,
  correctDecisions: 0,
  flaggedElements: {},
  decisions: [],
  gameComplete: false,
  pendingFeedback: null,
  gameStartedAt: null,
  // Power-up: double points for next profile
  doubleForNextAvailable: false,
  doubleForNextActive: false,
  doubleForNextUsed: false,
  // Reference notebook: per-profile reminders based on missed flags
  referenceNotes: [],
}

export function FriendOrFoeProvider({ children }) {
  const [state, dispatch] = useReducer(friendOrFoeReducer, initialState)

  const createPlayer = useCallback(async (name) => {
    const data = await playerService.createPlayer(name)
    dispatch({ type: 'CREATE_PLAYER', payload: data })
    return data
  }, [])

  const setFlag = useCallback((profileIndex, elementKey) => {
    dispatch({ type: 'SET_FLAG', payload: { profileIndex, elementKey } })
  }, [])

  const clearFlags = useCallback((profileIndex) => {
    dispatch({ type: 'CLEAR_FLAGS', payload: { profileIndex } })
  }, [])

  const submitDecision = useCallback((profileIndex, decision) => {
    const profile = PROFILES[profileIndex]
    if (!profile) return
    const correct = profile.correctDecision === decision
    const flagged = new Set(state.flaggedElements[profileIndex] ?? [])
    const redFlagKeys = new Set((profile.redFlags || []).map((f) => f.elementKey))
    const spottedFlags = [...flagged].filter((k) => redFlagKeys.has(k))
    const missedFlags = [...redFlagKeys].filter((k) => !flagged.has(k))
    const incorrectFlags = [...flagged].filter((k) => !redFlagKeys.has(k))

    let baseRoundPoints = 0
    let explanation = ''
    if (correct) {
      baseRoundPoints = BASE_POINTS_CORRECT + spottedFlags.length * BONUS_PER_FLAG
      explanation =
        decision === 'accept'
          ? profile.explanationAcceptedCorrect || 'Correct – this was a safe profile.'
          : profile.explanationRejectedCorrect || 'Correct – this was a fake profile.'
    } else {
      explanation =
        decision === 'accept'
          ? profile.explanationAcceptedWrong || 'That was a fake profile.'
          : profile.explanationRejectedWrong || 'That was a safe profile.'
    }

    // Apply penalties for incorrect flags: -10 per incorrect flag,
    // but never let the TOTAL score drop below 0.
    const penalty = incorrectFlags.length * PENALTY_PER_INCORRECT_FLAG
    let tentativeRoundPoints = baseRoundPoints - penalty
    let tentativeTotal = state.score + tentativeRoundPoints

    // Apply double-points power-up if active and not yet used
    let usedDoubleThisRound = false
    if (state.doubleForNextActive && !state.doubleForNextUsed) {
      tentativeRoundPoints *= 2
      tentativeTotal = state.score + tentativeRoundPoints
      usedDoubleThisRound = true
    }

    const clampedTotal = Math.max(0, tentativeTotal)
    const roundPoints = clampedTotal - state.score

    // Unlock double-for-next when reaching 4000+ for the first time
    const willUnlockDouble =
      !state.doubleForNextAvailable && !state.doubleForNextUsed && clampedTotal >= 4000

    dispatch({
      type: 'SUBMIT_DECISION',
      payload: {
        profileIndex,
        decision,
        roundPoints,
        correct,
        explanation,
        spottedFlags,
        missedFlags,
        usedDoubleThisRound,
        willUnlockDouble,
      },
    })
  }, [state.flaggedElements, state.score, state.doubleForNextActive, state.doubleForNextUsed, state.doubleForNextAvailable])

  const setCurrentProfileById = useCallback((profileId) => {
    dispatch({ type: 'SET_CURRENT_PROFILE_BY_ID', payload: { profileId } })
  }, [])

  const goToNextProfile = useCallback(() => {
    dispatch({ type: 'GO_TO_NEXT_PROFILE' })
  }, [])

  const finishGame = useCallback(async () => {
    if (!state.playerId) return
    await playerService.updatePlayer(state.playerId, {
      score: state.score,
      correctDecisions: state.correctDecisions,
      badge: '', // optional: compute from score
      completedAt: new Date().toISOString(),
    })
  }, [state.playerId, state.score, state.correctDecisions])

  const getLeaderboard = useCallback((limit = 10) => {
    return playerService.getLeaderboard(limit)
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const activateDoubleForNext = useCallback(() => {
    dispatch({ type: 'ACTIVATE_DOUBLE_FOR_NEXT' })
  }, [])

  const value = {
    ...state,
    profiles: PROFILES,
    currentProfile: PROFILES[state.currentProfileIndex] ?? null,
    flaggedSetForCurrent: new Set(state.flaggedElements[state.currentProfileIndex] ?? []),
    createPlayer,
    setFlag,
    clearFlags,
    setCurrentProfileById,
    submitDecision,
    goToNextProfile,
    finishGame,
    getLeaderboard,
    resetGame,
    activateDoubleForNext,
  }

  return (
    <FriendOrFoeContext.Provider value={value}>
      {children}
    </FriendOrFoeContext.Provider>
  )
}

export function useFriendOrFoe() {
  const ctx = useContext(FriendOrFoeContext)
  if (!ctx) throw new Error('useFriendOrFoe must be used within FriendOrFoeProvider')
  return ctx
}

export default FriendOrFoeContext
