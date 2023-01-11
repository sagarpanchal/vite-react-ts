import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"

import { FontIcon } from "shared/components/Icon"

import { useTheme } from "hooks"

export const colorIdMap = {
  light: <FontIcon type="sun-fill" className="me-2" />,
  dark: <FontIcon type="moon-stars-fill" className="me-2" />,
  auto: <FontIcon type="circle-half" className="me-2" />,
} as const

export function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {colorIdMap[theme]}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={setTheme.light}>{colorIdMap.light}Light</DropdownItem>
        <DropdownItem onClick={setTheme.dark}>{colorIdMap.dark}Dark</DropdownItem>
        <DropdownItem onClick={setTheme.auto}>{colorIdMap.auto}Auto</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
