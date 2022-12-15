import { formatDuration } from "./formatDuration"
import { getDateTimeDiff } from "./getDateTimeDiff"
import { LUXON_FORMAT } from "./utils.constants"

export function getFormattedDateTimeDiff(
  startISO: string,
  endISO: string,
  format = LUXON_FORMAT.DURATION,
): ReturnType<typeof formatDuration> {
  return formatDuration(getDateTimeDiff(startISO, endISO), format)
}
