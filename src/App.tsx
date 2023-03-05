import React from "react"
import { Container, Navbar } from "react-bootstrap"

import { ReactComponent as ReactLogo } from "shared/assets/react-logo.svg"
import { FontIcon } from "shared/components/Icon"

import { ListView } from "components/ListView"

import { useTheme } from "hooks"

const themeIconMap = {
  light: "sun-fill",
  dark: "moon-stars-fill",
  auto: "circle-half",
} as const

export default function App() {
  const [theme, setTheme] = useTheme()

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      !["light", "dark"].includes(theme.type)
        ? window.matchMedia("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light"
        : theme.type,
    )
  }, [theme])

  return (
    <React.Fragment>
      <Navbar bg="body-tertiary" expand="sm" className="border-bottom">
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <ReactLogo className="d-inline me-2" height="1em" />
            <span>React</span>
          </Navbar.Brand>
          <FontIcon className="px-1" title="Toggle theme" type={themeIconMap[theme.type]} onClick={setTheme.setNext} />
        </Container>
      </Navbar>
      <ListView />
    </React.Fragment>
  )
}
