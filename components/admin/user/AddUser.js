import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Grid,
  Input,
  Checkbox
} from '@material-ui/core';
import {
  getUsersWithRedux,
  createUser
} from '../../../store/action/userAction';
import { connect } from 'react-redux';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import { AddUserStyles } from './user.styles.jss';

const styles = AddUserStyles;

class EditUser extends Component {
  state = {
    _id: '',
    user_name: '',
    user_password: '',
    user_group: '',
    user_phone: '',
    user_email: '',
    onLoading: '',
    message: '',
    user_permission: {
      product: false,
      user: false,
      bill: false,
      category: false
    },
    user_status: true,
    open: false,
    user: {}
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  checkedCheckBox = () => {
    const permiss = window.document.getElementsByName('user_permission');
    for (let i = 0; i < permiss.length; i++) {
      permiss[i].checked = '';
    }
  };
  validated__input = (stateValue, regex, inputName, setError) => {
    const value = stateValue;
    const input = document.getElementsByName(inputName)[0];
    if (setError) this.setState({ err: { [setError]: true } });

    if (!input) {
      return false;
    }
    if (!regex.exec(value)) {
      input.focus();
      input.click();
      return false;
    }
    if (regex.exec(value)[0] !== regex.exec(value).input) {
      input.focus();
      return false;
    }
    if (setError) this.setState({ err: { [setError.key]: false } });
    return true;
  };
  valudated__form = () => {
    if (
      !this.validated__input(
        this.state.user_name,
        /[\w\s-]{1,}/,
        'user_name'
      ) ||
      !this.validated__input(
        this.state.user_password,
        /[\w\s-]{6,}/,
        'user_password'
      ) ||
      !this.validated__input(
        this.state.user_phone,
        /[0-9]{10,12}/,
        'user_phone'
      ) ||
      !this.validated__input(
        this.state.user_group,
        /[\w]{1,20}/,
        'user_group',
        'errSelection'
      ) ||
      !this.validated__input(
        this.state.user_email,
        /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
        'user_email'
      )
    ) {
      return false;
    }
    return true;
  };
  // submit
  handleSubmit = async e => {
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ onLoading: true });
    await this.props.createUser(this.state);
    if (!this.props.createError) {
      this.setState({
        onLoading: false,
        open: true,
        message: `Create ${this.state.user_email} success`
      });
      this.props.getUsersWithRedux();
    } else {
      this.setState({
        onLoading: false
      });
    }
  };
  handleSelectPermission = event => {
    this.setState({
      user_permission: {
        ...this.state.user_permission,
        [event.target.name]: event.target.checked
      }
    });
  };
  handleSelectUserStatus = event => {
    this.setState({
      user_status: event.target.checked
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} fadeIn`}>
        <h2 className={classes.formTitle}>Create New User</h2>
        <Grid container>
          <Grid item xs={6}>
            <form
              id="addNewUser"
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              {/* User Name */}
              <TextField
                required
                name="user_name"
                label="User Name"
                value={this.state.user_name}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <br />
              {/* User Password */}
              <TextField
                required
                name="user_password"
                label="Password"
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.user_password}
              />
              <br />
              {/* Phone */}
              <TextField
                required
                value={this.state.user_phone}
                name="user_phone"
                label="Phone"
                className={classes.textField}
                onChange={this.handleChange}
                type="number"
              />
              <br />
              {/* Group */}
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="user_group-select">Group</InputLabel>
                <Select
                  required
                  value={this.state.user_group}
                  onChange={this.handleChange}
                  name="user_group"
                  renderValue={value => value}
                  input={<Input id="user_group-select" />}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                </Select>
              </FormControl>
              <br />
              {/* permission */}
              {this.state.user_group === 'admin' ? (
                <>
                  <p style={{ color: 'gray', fontSize: '13px' }}>
                    Choose permission manager:
                  </p>
                  <Checkbox
                    checked={this.state.user_permission.bill}
                    onChange={this.handleSelectPermission}
                    name="bill"
                  />
                  Bill
                  <Checkbox
                    checked={this.state.user_permission.user}
                    onChange={this.handleSelectPermission}
                    name="user"
                  />
                  User
                  <Checkbox
                    checked={this.state.user_permission.product}
                    onChange={this.handleSelectPermission}
                    name="product"
                  />
                  Product
                  <Checkbox
                    checked={this.state.user_permission.category}
                    onChange={this.handleSelectPermission}
                    name="category"
                  />
                  Category
                </>
              ) : null}
              {/* Email */}
              <TextField
                required
                value={this.state.user_email}
                name="user_email"
                label="Email"
                className={classes.textField}
                onChange={this.handleChange}
                type="email"
              />
              <br />
              {/* user status */}
              Status :
              <Checkbox
                checked={this.state.user_status}
                onChange={this.handleSelectUserStatus}
              />
              {this.props.createError && (
                <h4 style={{ color: 'red' }}>{this.props.createError}</h4>
              )}
            </form>
            {this.state.onLoading ? (
              <Button variant="contained" color="primary">
                <CircularProgress size={24} className={classes.bgWhite} />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                form="addNewUser"
                type="submit"
              >
                Create
              </Button>
            )}
            <div onClick={this.handleClose}>
              <CustomizedSnackbars open={this.state.open}>
                {this.state.message}
              </CustomizedSnackbars>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    createError: state.user.createError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
    getUsersWithRedux: () => dispatch(getUsersWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUser)
);
