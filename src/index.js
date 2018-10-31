import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

//store stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers"; //importing the default export from index inside reducers folder

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
