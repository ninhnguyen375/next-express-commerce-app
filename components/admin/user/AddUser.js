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
import Axios from 'axios';

const styles = AddUserStyles;

class EditUser extends Component {
  state = {
    isAdding: '',
    message: '',
    user_permission: {
      product: false,
      user: false,
      bill: false,
      category: false
    },
    user_status: true,
    open: false,
    user_group: {
      value: '',
      error: true
    },
    user_name: {
      value: '',
      error: true
    },
    user_password: {
      value: '',
      error: true
    },
    user_phone: {
      value: '',
      error: true
    },
    user_email: {
      value: '',
      error: true
    },
    confirmPassword: {
      value: '',
      error: true
    },
    isDoublicateEmail: false
  };
  validated__form = () => {
    const {
      confirmPassword,
      user_email,
      user_name,
      user_phone,
      user_password,
      user_group,
      isDoublicateEmail
    } = this.state;

    if (user_email.error || isDoublicateEmail) {
      document.querySelector("input[name='user_email']").focus();
      return false;
    }
    if (user_name.error) {
      document.querySelector("input[name='user_name']").focus();
      return false;
    }
    if (user_phone.error) {
      document.querySelector("input[name='user_phone']").focus();
      return false;
    }
    if (user_password.error) {
      document.querySelector("input[name='user_password']").focus();
      return false;
    }
    if (user_group.error) {
      document.querySelector("input[name='user_password']").focus();
      return false;
    }

    if (user_password.value !== confirmPassword.value) {
      this.setState({ confirmPassword: { ...confirmPassword, error: true } });
      document.querySelector("input[name='confirmPassword']").focus();
      return false;
    }
    return true;
  };

  handleChange = e => {
    const regex = new RegExp(e.target.pattern);

    if (!regex.test(e.target.value)) {
      this.setState({
        [e.target.name]: { value: e.target.value, error: true }
      });
    } else {
      this.setState({
        [e.target.name]: { value: e.target.value, error: false }
      });
    }
  };

  checkDuplicateEmail = async () => {
    const { user_email } = this.state;

    try {
      const findUser = await Axios.get(
        '/api/users/find/?user_email=' + user_email.value
      );
      if (findUser.data.found)
        this.setState({ ...this.state, isDoublicateEmail: true });
      else {
        this.setState({ ...this.state, isDoublicateEmail: false });
      }
    } catch (err) {
      console.log(err);
    }
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

  // submit
  handleSubmit = async e => {
    this.setState({ isAdding: true });
    e.preventDefault();

    if (!this.validated__form()) {
      this.setState({ isAdding: false });
      return;
    }

    const {
      user_email,
      user_name,
      user_password,
      user_group,
      user_permission,
      user_phone,
      user_status
    } = this.state;
    const user = {
      user_name: user_name.value,
      user_password: user_password.value,
      user_phone: user_phone.value,
      user_permission: user_permission,
      user_group: user_group.value,
      user_email: user_email.value,
      user_status: user_status
    };

    await this.props.createUser(user);

    if (!this.props.createError) {
      this.setState({
        open: true,
        message: `Create ${this.state.user_email.value} success`
      });
      this.props.getUsersWithRedux();
    } else if (this.props.createError === 'Permision Denied') {
      alert('Permission Denied!');
      window.location = '/admin';
    }

    this.setState({ isAdding: false });
  };

  handleSelectPermission = event => {
    this.setState({
      user_permission: {
        ...this.state.user_permission,
        [event.target.name]: event.target.checked
      }
    });
  };

  handleOptionChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectUserStatus = event => {
    this.setState({
      user_status: event.target.checked
    });
  };

  render() {
    const { classes } = this.props;

    const {
      user_email,
      user_password,
      user_name,
      user_phone,
      confirmPassword,
      user_group,
      isDoublicateEmail
    } = this.state;

    return (
      <div className="admin-content fadeIn">
        <h2 className={classes.formTitle}>Create New User</h2>
        <Grid container>
          <Grid item xs={6}>
            <form noValidate id="addNewUser" onSubmit={this.handleSubmit}>
              {/* Email */}
              <TextField
                required
                error={user_email.error || isDoublicateEmail}
                onBlur={this.checkDuplicateEmail}
                label="Email"
                name="user_email"
                defaultValue={user_email.value}
                onChange={this.handleChange}
                className={classes.textField}
                helperText={
                  isDoublicateEmail
                    ? 'This email has been used'
                    : '123456@example.com'
                }
                inputProps={{
                  pattern:
                    '[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}'
                }}
              />
              {/* Name */}
              <TextField
                autocomplete="false"
                error={user_name.error}
                required
                label="Name"
                name="user_name"
                defaultValue={user_name.value}
                onChange={this.handleChange}
                className={classes.textField}
                inputProps={{
                  pattern: '^[ ._A-z0-9]*$'
                }}
                helperText={'no speacial character [!,@,#,$,%,^,&,*]'}
              />
              {/* Phone */}
              <TextField
                error={user_phone.error}
                required
                label="Phone"
                name="user_phone"
                defaultValue={user_phone.value}
                onChange={this.handleChange}
                className={classes.textField}
                type="number"
                helperText="10 number, first number is 0"
                inputProps={{ pattern: '0[0-9]{9}' }}
              />
              {/* Password */}
              <TextField
                error={user_password.error}
                required
                label="Password"
                name="user_password"
                defaultValue={user_password.value}
                onChange={this.handleChange}
                className={classes.textField}
                helperText="min 6 charaters"
                type="password"
                inputProps={{ pattern: '.{6,}' }}
              />
              {/* Confirm Password */}
              <TextField
                error={confirmPassword.error}
                required
                label="Confirm Password"
                name="confirmPassword"
                className={classes.textField}
                defaultValue={confirmPassword.value}
                type="password"
                onChange={this.handleChange}
                inputProps={{ pattern: '.{6,}' }}
              />
              <br />
              {/* Group */}
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="user_group-select">Group</InputLabel>
                <Select
                  required
                  value={this.state.user_group.value}
                  onChange={this.handleChange}
                  name="user_group"
                  renderValue={value => value}
                  input={<Input id="user_group-select" />}
                  error={user_group.error}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                </Select>
              </FormControl>
              <br />
              {/* permission */}
              {this.state.user_group.value === 'admin' ? (
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
            {this.state.isAdding ? (
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
