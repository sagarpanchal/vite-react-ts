import { formatDateTime } from "./formatDateTime"
import { LUXON_FORMAT } from "./utils.constants"

export function formatDate(isoDateTime: string, format = LUXON_FORMAT.DATE): ReturnType<typeof formatDateTime> {
  return formatDateTime(isoDateTime, format)
}
