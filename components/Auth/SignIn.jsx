import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Axios from 'axios';
import Router from 'next/router';
import ShopContext from '../../context/shop-context';
import SignInStyle from './SignIn.styles';

const styles = SignInStyle;

class SignIn extends React.Component {
  static contextType = ShopContext;

  state = {
    user_email: '',
    user_password: '',
    signInError: ''
  };

  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) Router.push('/');
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    this.setState({ onLoading: true });
    e.preventDefault();
    const signin = await Axios.post('/api/users/signinClient', {
      user_email: this.state.user_email,
      user_password: this.state.user_password
    });
    if (signin.data.err) {
      this.setState({ signInError: signin.data.err });
    } else {
      this.setState({ signInError: '' });
      const obj = {
        auth_name: signin.data.user.user_name,
        auth_key: signin.data.user._id
      };
      window.sessionStorage.setItem('auth', JSON.stringify(obj));
      Router.push('/');
    }
    this.setState({ onLoading: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="user_email">Email Address</InputLabel>
              <Input
                type="email"
                id="user_email"
                name="user_email"
                value={this.state.user_email}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="user_password">Password</InputLabel>
              <Input
                type="password"
                id="user_password"
                name="user_password"
                value={this.state.user_password}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <b style={{ color: 'red' }}>{this.state.signInError}</b>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
