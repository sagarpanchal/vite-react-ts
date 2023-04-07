import { DateTime, DateTimeOptions } from "luxon"

export function getDateTimeDiff(startISO: string, endISO: string, opts?: DateTimeOptions) {
  return DateTime.fromISO(endISO, opts).diff(DateTime.fromISO(startISO, opts))
}
