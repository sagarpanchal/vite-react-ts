import React from "react"
import ReactSelect from "react-select"
import type { Props as ReactSelectProps } from "react-select"

import { cx } from "utils"

const classNames: ReactSelectProps["classNames"] = {
  clearIndicator: ({ isFocused }) => {
    return cx(
      isFocused ? "text-neutral-600" : "text-neutral-200",
      "p-2",
      isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400",
    )
  },
  // container: () => cx(),
  control: ({ isDisabled, isFocused }) => {
    return cx(
      isDisabled ? "bg-neutral-50" : "bg-white",
      isDisabled ? "border-neutral-100" : isFocused ? "border-neutral-800" : "border-neutral-300",
      isFocused && "shadow-[0_0_0_1px] shadow-neutral-800",
      isFocused ? "hover:border-neutral-800" : "hover:border-neutral-300",
      "rounded",
      "border-solid",
      "border",
    )
  },
  dropdownIndicator: ({ isFocused }) => {
    return cx(
      isFocused ? "text-neutral-600" : "text-neutral-200",
      isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400",
      "p-2",
    )
  },
  group: () => cx("py-2"),
  groupHeading: () => cx("text-neutral-400", "text-xs", "font-medium", "mb-1", "px-3", "uppercase"),
  // indicatorsContainer: () => cx(),
  indicatorSeparator: ({ isDisabled }) => cx(isDisabled ? "bg-neutral-100" : "bg-neutral-200", "my-2"),
  input: () => cx("m-0.5", "py-0.5", "text-neutral-800"),
  loadingIndicator: ({ isFocused }) => cx(isFocused ? "text-neutral-600" : "text-neutral-200", "p-2"),
  loadingMessage: () => cx("text-neutral-400", "py-2", "px-3"),
  menu: () => cx("bg-white", "rounded", "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]", "my-1"),
  menuList: () => cx("py-1"),
  // menuPortal: () => cx(),
  multiValue: () => cx("bg-neutral-100", "rounded-sm", "m-0.5"),
  multiValueLabel: () => cx("rounded-sm", "text-neutral-800", "text-sm", "p-[3]", "pl-[6]"),
  multiValueRemove: ({ isFocused }) =>
    cx("rounded-sm", isFocused && "bg-red-500", "px-1", "hover:bg-red-500", "hover:text-red-800"),
  noOptionsMessage: () => cx("text-neutral-400", "py-2", "px-3"),
  option: ({ isDisabled, isFocused, isSelected }) => {
    return cx(
      isSelected ? "bg-neutral-800" : isFocused ? "bg-neutral-300" : "bg-transparent",
      isDisabled ? "text-neutral-200" : isSelected ? "text-white" : "text-inherit",
      "py-2",
      "px-3",
      !isDisabled && (isSelected ? "active:bg-neutral-800" : "active:bg-neutral-500"),
    )
  },
  placeholder: () => cx("text-neutral-500", "mx-0.5"),
  singleValue: ({ isDisabled }) => cx(isDisabled ? "text-neutral-400" : "text-neutral-800", "mx-0.5"),
  valueContainer: () => cx("py-0.5", "px-2"),
}

export const Select = React.memo((props: ReactSelectProps) => {
  return (
    <ReactSelect
      {...props}
      value={props.options?.find?.((opt: any) => opt?.value === props?.value)}
      classNames={classNames}
      unstyled
    />
  )
})
Select.displayName = "Select"
