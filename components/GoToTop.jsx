import React, { Component } from 'react';
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  btnGoToTop: {
    position: 'fixed',
    bottom: '60px',
    right: '10px'
  }
});
class GoToTop extends Component {
  handleClick = () => {
    window.scrollTo({ top: 0 });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fab
        onClick={this.handleClick}
        className={classes.btnGoToTop}
        color="primary"
        size="small"
      >
        <KeyboardArrowUp />
      </Fab>
    );
  }
}

export default withStyles(styles)(GoToTop);
