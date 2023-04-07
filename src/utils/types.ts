export type GenericObject = { [k: string | number | symbol]: GenericArray | GenericObject | unknown }

export type GenericArray = (GenericArray | GenericObject | unknown)[]
