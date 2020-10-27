import React from "react"
import ReactDOM from "react-dom"
import "semantic-ui-css/semantic.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-calendar/dist/Calendar.css"
import "./app/layout/styles.css"
import ScrollToTop from "./app/layout/ScrollToTop"
import App from "./app/layout/App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import { configureStore, history } from "./app/store/configureStore"
import { ConnectedRouter } from "connected-react-router"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop />
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
