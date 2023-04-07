import { Duration } from "luxon"

import { LUXON_FORMAT } from "./utils.constants"

export function formatDuration(duration: Duration, format = LUXON_FORMAT.DURATION): string | undefined {
  return Duration.isDuration(duration) && duration?.isValid ? duration.toFormat(format) : undefined
}
