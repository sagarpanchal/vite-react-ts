import { DateTime, Duration } from "luxon"

export function getDateTimeDiff(startISO: string, endISO: string): Duration {
  return DateTime.fromISO(endISO).diff(DateTime.fromISO(startISO))
}
