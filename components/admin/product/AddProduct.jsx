import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@material-ui/core';
import ProductStyles from './product.styles.jss';
import {
  createProduct,
  getProductsWithRedux
} from '../../../store/action/productAction';
import { getCategoriesWithRedux } from '../../../store/action/categoryAction';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';

const styles = ProductStyles;

class AddProduct extends Component {
  state = {
    product_name: '',
    product_price: '',
    producer: '',
    quantity: '',
    product_img: '',
    product_img_path: '',
    isAdding: false,
    message: '',
    open: false,
    err: {
      errSelection: false
    },
    categories: [],
    validateError: false
  };

  async componentDidMount() {
    await this.props.getCategoriesWithRedux();
    if (this.props.categories && this.props.categories.data) {
      this.setState({ categories: this.props.categories.data });
    }
  }

  handleChangeFile = e => {
    this.setState({
      product_img: e.target.files[0],
      product_img_path: e.target.files[0].name
    });
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
    if (setError) this.setState({ err: { [setError]: true } });

    if (!input) {
      return false;
    }
    if (!regex.test(value)) {
      input.focus();
      this.setState({ validateError: 'Please complete this field' });
      return false;
    }
    if (setError)
      this.setState({ err: { [setError.key]: false }, validateError: '' });
    return true;
  };

  validated__input_file = (inputName, setError) => {
    const input = document.getElementsByName(inputName)[0];
    if (setError) this.setState({ err: { [setError]: true } });
    if (!input || !input.value) {
      input.click();
      return false;
    }
    if (setError) this.setState({ err: { [setError.key]: false } });
    return true;
  };

  valudated__form = () => {
    if (
      !this.validated__input(
        this.state.product_name,
        /[\w\s-]{1,}/,
        'product_name'
      ) ||
      !this.validated__input(
        this.state.product_price,
        /^[1-9][0-9]{0,5}$/,
        'product_price'
      ) ||
      !this.validated__input(
        this.state.quantity,
        /^[1-9][0-9]{0,5}$/,
        'quantity'
      ) ||
      !this.validated__input(
        this.state.producer,
        /^[\w]{1,20}$/,
        'producer',
        'errSelection'
      ) ||
      !this.validated__input_file('product_img')
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async e => {
    const { createProduct, getProductsWithRedux } = this.props;
    this.setState({ isAdding: true });
    e.preventDefault();

    if (!this.valudated__form()) {
      this.setState({ isAdding: false });
      return;
    }

    await createProduct(this.state);

    if (!this.props.createError) {
      getProductsWithRedux();
      this.setState({
        open: true,
        message: `Adding ${this.state.product_name} success`
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
        <h2 className={classes.formTitle}>Add new Product</h2>
        <form
          encType="multipart/form-data"
          id="addNewProduct"
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {/* Product Name */}
          <TextField
            required
            name="product_name"
            label="Product Name"
            className={classes.textField}
            onChange={this.handleChange}
          />
          {/* Product Price */}
          <TextField
            required
            name="product_price"
            label="Price ($)"
            className={classes.textField}
            onChange={this.handleChange}
            type="number"
          />
          {/* Quantity */}
          <TextField
            required
            value={this.state.quantity}
            name="quantity"
            label="Quantity"
            className={classes.textField}
            onChange={this.handleChange}
            type="number"
          />
          {/* Producer - Catefory */}
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="select-producer">Catefory</InputLabel>
            <Select
              error={this.state.err.errSelection}
              value={this.state.producer}
              onChange={this.handleChange}
              inputProps={{
                name: 'producer',
                id: 'select-producer'
              }}
            >
              {this.state.categories &&
                this.state.categories.map((item, index) => (
                  <MenuItem key={index} value={item.producer_id}>
                    {item.producer_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {/* Input img */}
          <TextField
            required
            name="product_img"
            label="Choose Image"
            className={classes.textField}
            onChange={this.handleChangeFile}
            type="file"
          />
          {this.props.createError && (
            <p style={{ color: 'red' }}>{this.props.createError}</p>
          )}
          {this.state.validateError && (
            <p style={{ color: 'red' }}>{this.state.validateError}</p>
          )}
        </form>
        <Button
          variant="contained"
          color="primary"
          form="addNewProduct"
          type="submit"
        >
          {this.state.isAdding ? (
            <CircularProgress size={24} className={classes.bgWhite} />
          ) : (
            <span>Add New Product</span>
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
    createError: state.product.createError,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
    getProductsWithRedux: () => dispatch(getProductsWithRedux()),
    getCategoriesWithRedux: () => dispatch(getCategoriesWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddProduct)
);
