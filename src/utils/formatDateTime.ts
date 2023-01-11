import { DateTime } from "luxon"

import { LUXON_FORMAT } from "./utils.constants"

export function formatDateTime(isoDateTime: string, format = LUXON_FORMAT.DATE_TIME): string | undefined {
  const dateTime = DateTime.fromISO(isoDateTime)
  return dateTime.isValid ? dateTime.toFormat(format) : undefined
}
