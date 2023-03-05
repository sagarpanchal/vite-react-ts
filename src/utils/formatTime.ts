import { formatDateTime } from "./formatDateTime"
import { LUXON_FORMAT } from "./utils.constants"

export function formatTime(isoDateTime: string, format = LUXON_FORMAT.TIME): ReturnType<typeof formatDateTime> {
  return formatDateTime(isoDateTime, format)
}
