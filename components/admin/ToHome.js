import React, { Component } from "react";
export default class ToHome extends Component {
  render() {
    return (
      <div>
        <h3 style={{ color: "gray" }}>Redirecting to Home ...</h3>
        {(window.location = "/home")}
      </div>
    );
  }
}
