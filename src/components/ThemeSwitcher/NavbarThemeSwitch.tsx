import { FontIcon } from "shared/components/Icon"

import { useTheme } from "hooks"

export function NavbarThemeSwitch() {
  const [theme, setTheme] = useTheme()

  return <FontIcon className="px-1" title="Toggle theme" type={theme.icon} onClick={setTheme.setNext} />
}
