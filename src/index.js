import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./conteiners/App";
import store from "./store/store";
import { BrowserRouter, Route } from "react-router-dom";

const target = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  target
);
