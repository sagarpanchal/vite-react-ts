import React from "react"

import { produce } from "immer"
import { words } from "lodash-es"

import { createFastContext } from "components/Context"

import { titleCase } from "utils"

type State = { name: { first: string; last: string } }

const { Provider, useContextStore, useContextSelector } = createFastContext<State>({ name: { first: "", last: "" } })

function NameDisplay({ nameKey }: { nameKey: keyof State["name"] }) {
  const name = useContextSelector((state) => state.name[nameKey])

  return (
    <label>
      {titleCase(words(nameKey).join(" "))}: {name}
    </label>
  )
}

function NameInput({ nameKey }: { nameKey: keyof State["name"] }) {
  const store = useContextStore()
  const name = useContextSelector((state) => state.name[nameKey])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.set(
      produce((state) => {
        state.name[nameKey] = e.target.value
      }),
    )
  }

  return (
    <input className="form-control" type="text" placeholder={`Enter ${nameKey}`} value={name} onChange={handleChange} />
  )
}

export const NameForm = React.memo(() => {
  return (
    <Provider>
      <fieldset>
        <div className="mb-3" style={{ maxWidth: "192px" }}>
          <NameDisplay nameKey="first" />
          <NameInput nameKey="first" />
        </div>
        <div className="mb-3" style={{ maxWidth: "192px" }}>
          <NameDisplay nameKey="last" />
          <NameInput nameKey="last" />
        </div>
      </fieldset>
    </Provider>
  )
})
NameForm.displayName = "NameForm"
