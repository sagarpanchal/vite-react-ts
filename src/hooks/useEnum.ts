import React from "react"

import { useAutoRef } from "./useAutoRef"

type TEnumValue = string | number | undefined
type TEnumBoolObject<T> = { [k in keyof T]: boolean }
type TEnumActiveObject<T> = { [k in keyof T]: () => void }
type THookState<T, U> = {
  is: TEnumBoolObject<T>
  key: keyof T
  value: U | T[keyof T]
}

export function useEnum<T extends { [k: string]: TEnumValue }, U extends T[keyof T]>(
  defaultKeyRes: U,
  enumRes: T,
): [THookState<T, U>, TEnumActiveObject<T>] {
  const enumsRef = useAutoRef<T>(enumRes)

  const [selectedKey, setSelectedKey] = React.useState<keyof T>(defaultKeyRes as keyof T)

  const [isSelected, setIsSelected] = React.useState(() => {
    const enums = enumRes
    const defaultKey = defaultKeyRes
    return Object.fromEntries(Object.entries(enums).map(([key]) => [key, key === defaultKey])) as TEnumBoolObject<T>
  })

  React.useEffect(() => {
    const enums = enumsRef.current
    setIsSelected(
      Object.fromEntries(Object.entries(enums).map(([key]) => [key, key === selectedKey])) as TEnumBoolObject<T>,
    )
  }, [selectedKey, enumsRef])

  const switchTo = React.useMemo<TEnumActiveObject<T>>((): TEnumActiveObject<T> => {
    const enums = enumsRef.current
    return Object.fromEntries(
      Object.entries(enums).map(([key]) => [key, () => setSelectedKey(key)]),
    ) as TEnumActiveObject<T>
  }, [enumsRef])

  return [
    {
      is: isSelected,
      key: selectedKey,
      value: enumRes[selectedKey],
    },
    switchTo,
  ]
}
