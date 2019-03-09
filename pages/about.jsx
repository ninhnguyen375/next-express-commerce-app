import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

export class about extends Component {
  render() {
    return (
      <Paper>
        <Grid container justify="center">
          <Grid item>
            <h1 style={{ color: 'gray' }}>ĐỒ ÁN WEB 2</h1>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default about;
