import axios from 'axios'

const TELEMETRY_API_URL = '/api/telemetry/events'

const createEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const sendTelemetryEvent = async (event) => {
  const payload = {
    eventId: createEventId(),
    timestamp: new Date().toISOString(),
    source: 'web',
    environment: import.meta.env.PROD ? 'production' : 'development',
    ...event,
  }

  await axios.post(TELEMETRY_API_URL, payload)
}

export const sendTelemetryEventsBatch = async (events = []) => {
  const payloadEvents = events.map((event) => ({
    eventId: createEventId(),
    timestamp: new Date().toISOString(),
    source: 'web',
    environment: import.meta.env.PROD ? 'production' : 'development',
    ...event,
  }))

  await axios.post(TELEMETRY_API_URL, { events: payloadEvents })
}
