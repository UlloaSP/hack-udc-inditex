import React from "react";
import ReactDOM from "react-dom/client";

import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import backend, { NetworkError } from "./backend";
import { initReactIntl } from "./i18n";
import app, { App } from "./modules/app";
import store from "./store";
import "./styles.css";

backend.init(() => store.dispatch(app.actions.error(new NetworkError())));

const { locale, messages } = initReactIntl();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <HashRouter>
          <App />
        </HashRouter>
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
