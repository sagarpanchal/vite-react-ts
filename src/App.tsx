import React from "react"
import { NavbarToggler, Collapse, Nav } from "reactstrap"

import { ThemeSwitcher } from "shared/components/ThemeSwitcher"

import { ListView } from "components/ListView"

import { useBoolean } from "hooks"

export default function App() {
  const [isNavOpen, setIsNavOpen] = useBoolean()

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            React.js
          </a>
          <NavbarToggler onClick={setIsNavOpen.toggle} />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav className="ms-auto" navbar>
              <ThemeSwitcher />
            </Nav>
          </Collapse>
        </div>
      </nav>
      <ListView />
    </React.Fragment>
  )
}
