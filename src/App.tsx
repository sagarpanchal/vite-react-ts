import React from "react"
import { Navbar } from "react-bootstrap"

import { ReactComponent as ReactLogo } from "shared/assets/react-logo.svg"

import { ListView } from "components/ListView"
import { NavbarThemeSwitch } from "components/ThemeSwitcher"

import { useApplyThemeChanges } from "hooks/useTheme"

export default function App() {
  useApplyThemeChanges()

  return (
    <React.Fragment>
      <nav className="border-bottom navbar navbar-expand-sm navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <ReactLogo className="d-inline me-2" height="1em" />
            <span>React</span>
          </Navbar.Brand>
          <NavbarThemeSwitch />
        </div>
      </nav>
      <ListView />
    </React.Fragment>
  )
}
