import React from "react"
import { Container, Navbar } from "react-bootstrap"

import { ReactComponent as ReactLogo } from "shared/assets/react-logo.svg"
import { FontIcon } from "shared/components/Icon"

import { ListView } from "components/ListView"

import { useTheme } from "hooks"
import { useApplyThemeChanges } from "hooks/useTheme"

export default function App() {
  const [theme, setTheme] = useTheme()
  useApplyThemeChanges()

  return (
    <React.Fragment>
      <Navbar bg="body-tertiary" expand="sm" className="border-bottom">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <ReactLogo className="d-inline me-2" height="1em" />
            <span>React</span>
          </Navbar.Brand>
          <FontIcon className="px-1" title="Toggle theme" type={theme.icon} onClick={setTheme.setNext} />
        </Container>
      </Navbar>
      <ListView />
    </React.Fragment>
  )
}
