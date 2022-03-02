import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store/configureStore";
import 'react-map-gl/node_modules/mapbox-gl/dist/mapbox-gl.css';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={configureStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
