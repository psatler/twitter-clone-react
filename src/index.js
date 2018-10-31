import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

//store stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers"; //importing the default export from index inside reducers folder

//importing middlewares
import middleware from "./middleware";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
