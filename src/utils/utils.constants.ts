export const LOCALE = "en-US"

export const CURRENCY = "USD"

export const TIMEZONE_IANA = "Asia/Kolkata"

export const FRACTION_LENGTH = 2

export const LUXON_FORMAT = {
  DATE: "dd/LL/y",
  TIME: "HH:mm ",
  DATE_TIME: "dd/LL/y HH:mm",
  DURATION: "hh:mm:ss",
}

export const REGEX = {
  NUMERIC: {
    STRICT: /^[+-]?[\d]+[.]?[\d]*$/gm,
    LOOSE: /^[+-]?[\d]*[.]?[\d]*$/gm,
  },
  ALPHA_NUMERIC: {
    STRICT: /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{1,})[a-zA-Z0-9]+$/gm,
    LOOSE: /^[-0-9a-zA-Z]*$/gm,
  },
}

export const MIME_TYPE = {
  HTML: "text/html",
  SVG: "image/svg+xml",
}

export const EMPTY_VALUES = {
  ARRAY: [],
  FUNCTION: () => undefined,
  NULL: null,
  NUMBER: 0,
  OBJECT: {},
  STRING: "",
  UNDEFINED: undefined,
}
