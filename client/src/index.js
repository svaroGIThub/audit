import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "./ReactRouter";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<ReactRouter />, document.getElementById("root"));
registerServiceWorker();
