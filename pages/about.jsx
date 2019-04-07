import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

class about extends Component {
  handleClickHello = () => {
    alert("Hello world!");
    alert("hello world");
    console.log("hello world");
  };

  componentDidMount() {
    alert("Hello World");
  }

  render() {
    return (
      <Paper>
        <Grid container={true} justify="center">
          <Grid item={true}>
            <h1 onClick={this.handleClickHello} style={{ color: "gray" }}>
              Do An Web 2
            </h1>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default about;
