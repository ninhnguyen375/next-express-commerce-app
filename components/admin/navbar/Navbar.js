import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  menuButton: {
    marginLeft: 40,
    marginRight: 0
  }
};

class Navbar extends React.Component {
  signOut = () => {
    window.localStorage.removeItem('adminPageAccess');
    window.location = '/admin';
  };
  toggleSidebar = () => {
    const sidebar = window.document.getElementsByClassName('sidebar')[0];
    const app = window.document.getElementsByClassName('App')[0];
    if (sidebar.style.display === 'none') {
      app.style.marginLeft = '166px';
      sidebar.style.display = 'block';
    } else {
      app.style.marginLeft = '0';
      sidebar.style.display = 'none';
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={`${classes.grow} brand-title`}
            >
              <Link href="/admin">
                <a className="brand-text">Admin Page</a>
              </Link>
              <IconButton
                id="toggleSidebar"
                onClick={this.toggleSidebar}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon color="action" />
              </IconButton>
            </Typography>
            {/* Right */}
            {this.props.adminName && (
              <span style={{ color: '#18776e' }}>{this.props.adminName}</span>
            )}
            <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              color="default"
            >
              <AccountCircle />
            </IconButton>
            <Button
              onClick={this.signOut}
              variant="contained"
              color="primary"
              size="small"
            >
              OUt
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
