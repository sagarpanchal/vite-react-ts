import { DateTimeOptions } from "luxon"

import { formatDuration } from "./formatDuration"
import { getDateTimeDiff } from "./getDateTimeDiff"
import { LUXON_FORMAT } from "./utils.constants"

export function getFormattedDateTimeDiff(
  startISO: string,
  endISO: string,
  opts?: DateTimeOptions & { format?: string },
): ReturnType<typeof formatDuration> {
  const { format, ...options } = { format: LUXON_FORMAT.DURATION, ...opts }
  return formatDuration(getDateTimeDiff(startISO, endISO, options), format)
}
