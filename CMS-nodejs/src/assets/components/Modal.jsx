import React from "react";
import ReactDOM from "react-dom";

export default function Modal() {
  return ReactDOM.createPortal(<></>, document.querySelector("body"));
}
