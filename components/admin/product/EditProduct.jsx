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
  Input
} from '@material-ui/core';
import {
  editProduct,
  getProductsAndCategories
} from '../../../store/action/productAction';
import { connect } from 'react-redux';
import Link from 'next/link';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';

const styles = () => ({
  textField: {
    margin: 10,
    width: 400
  },
  formTitle: {
    color: '#4445'
  },
  bgWhite: {
    color: 'white'
  },
  root: {
    backgroundColor: 'white',
    borderRadius: '7px',
    padding: 20
  }
});

class EditProduct extends Component {
  state = {
    _id: '',
    product_name: '',
    product_price: 1,
    producer: '',
    quantity: 1,
    product_img: null,
    product_img_path: '',
    onLoading: false,
    message: '',
    open: false,
    product: {},
    stateImgPath: '',
    validateError: false
  };

  handleChangeFile = e => {
    this.setState({
      product_img: e.target.files[0],
      product_img_path: e.target.files[0] ? e.target.files[0].name : null
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
      this.setState({
        err: { [setError]: true },
        validateError: 'Please complete this field'
      });
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
        /^[0-9]{1,5}$/,
        'product_price'
      ) ||
      !this.validated__input(this.state.quantity, /^[0-9]{1,5}$/, 'quantity') ||
      !this.validated__input(
        this.state.producer,
        /[\w]{1,20}/,
        'producer',
        'errSelection'
      )
    ) {
      return false;
    }
    return true;
  };

  // submit edit
  handleSubmit = async e => {
    const { editProduct } = this.props;
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ onLoading: true });

    await editProduct(this.state);

    if (!this.props.editError) {
      this.setState({
        ...this.state,
        onLoading: false,
        open: true,
        message: `Edit ${this.state.product_name} success`,
        stateImgPath: this.state.product_img_path
          ? `/static/uploads/${this.state.product_img_path.trim()}`
          : `${this.state.stateImgPath}`
      });
    } else {
      alert('Permission Denied!');
      window.location = '/admin';
      this.setState({
        ...this.state,
        onLoading: false,
        message: this.props.editError
      });
    }
  };

  async componentDidMount() {
    await this.props.getProductsAndCategories();

    if (this.props.haveProduct) {
      const pro = this.props.product;
      const producer = this.props.categories.find(
        item => item.producer_name === pro.producer
      );

      this.setState({
        product_name: pro.product_name,
        product_price: pro.product_price,
        producer: producer.producer_id,
        quantity: pro.quantity,
        _id: pro._id,
        stateImgPath: `/static${pro.product_img}`
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="admin-content fadeIn">
        <h2 className={classes.formTitle}>
          Edit Product
          <Link href="/admin/product">
            <a style={{ marginLeft: 200 }}>
              <Button variant="contained" color="default">
                Back
              </Button>
            </a>
          </Link>
        </h2>
        {this.props.haveProduct ? (
          <Grid container>
            <Grid item xs={6}>
              <form
                noValidate
                id="addNewProduct"
                autoComplete="off"
                onSubmit={this.handleSubmit}
              >
                {/* Product Name */}
                <TextField
                  required
                  name="product_name"
                  label="Product Name"
                  value={this.state.product_name}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <br />

                {/* Product Price */}
                <TextField
                  required
                  name="product_price"
                  label="Price ($)"
                  className={classes.textField}
                  onChange={this.handleChange}
                  value={this.state.product_price}
                  type="number"
                  min={1}
                />
                <br />

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
                <br />

                {/* Producer - Catefory */}
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="producer-select">Category</InputLabel>
                  <Select
                    required
                    value={this.state.producer}
                    onChange={this.handleChange}
                    name="producer"
                    renderValue={value => value}
                    input={<Input id="producer-select" />}
                  >
                    {this.props.categories &&
                      this.props.categories.map((item, index) => (
                        <MenuItem key={index} value={item.producer_id}>
                          {item.producer_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <br />

                {/* Input img */}
                <TextField
                  accept="image/*"
                  name="product_img"
                  className="hidden"
                  onChange={this.handleChangeFile}
                  type="file"
                  id="contained-button-file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
                <br />
                <br />
                {this.props.createError && (
                  <p style={{ color: 'red' }}>{this.props.createError}</p>
                )}
                {this.state.validateError && (
                  <p style={{ color: 'red' }}>{this.state.validateError}</p>
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
                  form="addNewProduct"
                  type="submit"
                >
                  Edit
                </Button>
              )}
              <div onClick={this.handleClose}>
                <CustomizedSnackbars open={this.state.open}>
                  {this.state.message}
                </CustomizedSnackbars>
              </div>
            </Grid>
            <Grid item xs={6}>
              <img
                alt="product image"
                src={this.state.stateImgPath}
                width="310"
              />
            </Grid>
          </Grid>
        ) : (
          <h1>Not have this product.</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const { products } = state.product;
  let product = null;
  let haveProduct = false;
  if (products) {
    if (products.data) {
      product = products.data.find(pro => pro._id === id);
      if (product) {
        haveProduct = true;
      }
    }
  }
  return {
    product: product,
    haveProduct,
    editError: state.product.editError,
    categories: state.product.categories.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProduct: product => dispatch(editProduct(product)),
    getProductsAndCategories: () => dispatch(getProductsAndCategories())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProduct)
);
