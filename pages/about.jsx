import { TextField } from "@material-ui/core";
import React from "react";

class About extends React.Component {
  state = {
    name: "Ninh",
    age: 19
  };

  componentDidMount() {
    console.log("Hello " + this.state.name);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <h4>{`My name is ${this.state.name}, and i'm ${
          this.state.age
        } year old.`}</h4>
        <TextField
          value={this.state.name}
          name={"name"}
          onChange={this.handleChange}
        />
        <TextField
          value={this.state.age}
          name={"age"}
          onChange={this.handleChange}
          type={"number"}
        />
      </div>
    );
  }
}

export default About;
