import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';

class about extends Component {
  state = {
    name: 'Ninh'
  };

  handleClickHello = () => {
    alert('Hello Every Body, My name is Ninh.');
    console.log('Hello world');
  };

  componentDidMount() {
    console.log('hello world');
  }

  handleDelete = () => {
    alert('deleted');
  };

  helloFunc = () => {
    console.log('hello');
  };

  componentDidMount() {
    alert('Hello World');
  }

  render() {
    return (
      <Paper>
        <Grid container={true} justify="center">
          <Grid item={true}>
            <h1 onClick={this.handleClickHello} style={{ color: 'gray' }}>
              Do An Web 2
            </h1>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default about;
