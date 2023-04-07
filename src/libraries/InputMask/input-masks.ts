export const INPUT_MASKS = {
  ALPHA: {
    mask: "X{0,}",
    definitions: { X: { validator: "[a-zA-Z]" } },
    jitMasking: true,
  },
  NUMERIC: {
    mask: "X{0,}",
    definitions: { X: { validator: "[0-9]" } },
    jitMasking: true,
  },
  ALPHA_NUMERIC: {
    mask: "X{0,}",
    definitions: { X: { validator: "[a-zA-Z0-9]" } },
    jitMasking: true,
  },
  NUMERIC_SIGNED: {
    mask: "P{0,1}X{0,}",
    definitions: { P: { validator: "[+|-]" }, X: { validator: "[0-9]" } },
    jitMasking: true,
  },
  ALPHA_NUMERIC_WITH_SPACE: {
    mask: "X{0,}",
    definitions: { X: { validator: "[a-zA-Z0-9 ]" } },
    jitMasking: true,
  },
  SSN: {
    mask: "9{3}-9{2}-9{4}",
  },
  EIN: {
    mask: "9{2}-9{7}",
  },
  PHONE: {
    alias: "phone",
    jitMasking: true,
  },
} as const
