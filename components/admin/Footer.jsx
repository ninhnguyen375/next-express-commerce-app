import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class Footer extends Component {
  render() {
    return (
      <Grid
        container
        style={{ flexGrow: 1, padding: 20, color: 'gray' }}
        spacing={16}
      >
        <Grid item style={{ flexGrow: 1 }}>
          &copy; ShopPhone 2019
        </Grid>
        <Grid item>
          <a
            style={{ color: 'blue' }}
            href="https://github.com/ninhnguyen375/next-express-commerce-app"
          >
            Project on Github
          </a>
        </Grid>
      </Grid>
    );
  }
}

export default Footer;
