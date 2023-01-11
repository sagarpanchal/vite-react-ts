import { DateTime } from "luxon"

import { TIMEZONE_IANA } from "./utils.constants"

export function getCurrentTime() {
  return DateTime.local().setZone(TIMEZONE_IANA)
}
