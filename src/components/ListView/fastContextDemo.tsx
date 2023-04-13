import React from "react"

import { words } from "lodash-es"

import { createFastContext } from "components/Context"

import { titleCase } from "utils"

type State = { firstName: string; lastName: string }

const { Provider, useContextSelector } = createFastContext<State>({ firstName: "", lastName: "" })

function NameDisplay({ nameKey }: { nameKey: keyof State }) {
  const [name] = useContextSelector((state) => state[nameKey])

  return (
    <label>
      {titleCase(words(nameKey).join(" "))}: {name}
    </label>
  )
}

function NameInput({ nameKey }: { nameKey: keyof State }) {
  const [, setNames] = useContextSelector(() => undefined)

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNames({ [nameKey]: e.target.value })
    },
    [nameKey, setNames],
  )

  return <input className="form-control" type="text" placeholder={`Enter ${nameKey}`} onChange={handleChange} />
}

export function NameForm() {
  return (
    <Provider>
      <fieldset>
        <div className="mb-3" style={{ maxWidth: "192px" }}>
          <NameDisplay nameKey="firstName" />
          <NameInput nameKey="firstName" />
        </div>
        <div className="mb-3" style={{ maxWidth: "192px" }}>
          <NameDisplay nameKey="lastName" />
          <NameInput nameKey="lastName" />
        </div>
      </fieldset>
    </Provider>
  )
}
