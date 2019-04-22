import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import {
  createCategory,
  getCategoriesWithRedux
} from '../../../store/action/categoryAction';
import { connect } from 'react-redux';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    margin: 10,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  formTitle: {
    color: '#4445'
  },
  bgWhite: {
    color: 'white'
  }
});

class AddCategory extends Component {
  state = {
    producer_name: '',
    producer_id: '',
    isAdding: false,
    message: '',
    open: false,
    validateError: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  validated__input = (stateValue, regex, inputName, setError) => {
    const value = stateValue;
    const input = document.getElementsByName(inputName)[0];
    if (!input) {
      return false;
    }
    if (!regex.test(value)) {
      input.focus();
      this.setState({ validateError: 'Please complete this field' });
      return false;
    }
    this.setState({ validateError: '' });
    return true;
  };
  valudated__form = () => {
    if (
      !this.validated__input(
        this.state.producer_name,
        /[\w\s-]{1,}/,
        'producer_name'
      ) ||
      !this.validated__input(
        this.state.producer_id,
        /^[A-Z]{1,}$/,
        'producer_id'
      )
    ) {
      return false;
    }
    return true;
  };
  handleSubmit = async e => {
    this.setState({ isAdding: true });

    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }

    await this.props.createCategory(this.state);

    if (!this.props.createError) {
      this.props.getCategoriesWithRedux();
      this.setState({
        open: true,
        message: `Adding ${this.state.producer_id} success`
      });
    } else if (this.props.createError === 'Permision Denied') {
      alert('Permission Denied!');
      window.location = '/admin';
    }

    this.setState({ isAdding: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h2 className={classes.formTitle}>Add new Category</h2>
        <form
          encType="multipart/form-data"
          id="addNewCategory"
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {/* Category Name */}
          <TextField
            required
            name="producer_name"
            label="Category Name"
            className={classes.textField}
            onChange={this.handleChange}
            helperText="Not special character"
          />
          {/* ID */}
          <TextField
            required
            name="producer_id"
            label="ID"
            className={classes.textField}
            onChange={this.handleChange}
            helperText="Uppercase Only"
          />
        </form>
        {this.props.createError && (
          <p style={{ color: 'red' }}>{this.props.createError}</p>
        )}
        {this.state.validateError && (
          <p style={{ color: 'red' }}>{this.state.validateError}</p>
        )}
        <Button
          variant="contained"
          color="primary"
          form="addNewCategory"
          type="submit"
        >
          {this.state.isAdding ? (
            <CircularProgress size={24} className={classes.bgWhite} />
          ) : (
            <span>Add New Category</span>
          )}
        </Button>
        <div onClick={this.handleClose}>
          <CustomizedSnackbars open={this.state.open}>
            {this.state.message}
          </CustomizedSnackbars>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    createError: state.category.createError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => dispatch(createCategory(category)),
    getCategoriesWithRedux: () => dispatch(getCategoriesWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddCategory)
);
