import React from "react"
import { Provider } from "react-redux"

import ReactDOM from "react-dom/client"

import { GlobalLoader } from "shared/components/Loader"
import { ReloadPrompt } from "shared/components/ReloadPrompt"

import App from "App"
import { store } from "redux/store"

import "styles/main.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReloadPrompt />
      <GlobalLoader />
      <App />
    </Provider>
  </React.StrictMode>,
)
