import React from "react"

import { useAutoRef } from "./useAutoRef"

type EnumValue = string | number | undefined
type EnumBoolObject<T> = { [k in keyof T]: boolean }
type EnumActiveObject<T> = { [k in keyof T]: () => void }

export function useEnum<T extends { [k: string]: EnumValue }, U extends T[keyof T]>(defaultKeyRes: U, enumRes: T) {
  const enumsRef = useAutoRef<T>(enumRes)

  const [selectedKey, setSelectedKey] = React.useState<keyof T>(defaultKeyRes as keyof T)

  const [isSelected, setIsSelected] = React.useState(() => {
    const enums = enumRes
    const defaultKey = defaultKeyRes
    return Object.fromEntries(Object.entries(enums).map(([key]) => [key, key === defaultKey])) as EnumBoolObject<T>
  })

  React.useEffect(() => {
    const enums = enumsRef.current
    setIsSelected(
      Object.fromEntries(Object.entries(enums).map(([key]) => [key, key === selectedKey])) as EnumBoolObject<T>,
    )
  }, [selectedKey, enumsRef])

  const switchTo = React.useMemo<EnumActiveObject<T>>((): EnumActiveObject<T> => {
    const enums = enumsRef.current
    return Object.fromEntries(
      Object.entries(enums).map(([key]) => [key, () => setSelectedKey(key)]),
    ) as EnumActiveObject<T>
  }, [enumsRef])

  return [
    {
      is: isSelected,
      key: selectedKey,
      value: enumRes[selectedKey],
    },
    switchTo,
  ] as const
}
