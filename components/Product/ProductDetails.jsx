import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Axios from 'axios';

class ProductDetails extends Component {
  state = {
    quantity: 1,
    addError: ''
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validated__input = (stateValue, name, regex) => {
    const input = window.document.getElementsByName(name)[0];
    if (!input) return false;
    if (regex.test(stateValue)) return true;
    else {
      input.value = '';
      this.setState({ [name]: '' });
      input.placeholder = '1 to 5';
      input.focus();
      return false;
    }
  };
  hanldeSubmit = async e => {
    e.preventDefault();
    if (!this.validated__input(this.state.quantity, 'quantity', /^[1-5]$/))
      return;
    const auth = JSON.parse(window.sessionStorage.getItem('auth'));
    if (!auth) {
      alert('Login First!');
      return;
    }
    try {
      const addCart = await Axios.post('/api/carts', {
        userId: auth.auth_key,
        quantity: this.state.quantity,
        proId: this.props.product.product_id,
        proPrice: this.props.product.product_price
      });
      if (addCart.data.err) this.setState({ addError: addCart.data.err });
      else {
        alert('Added To Your Cart');
      }
    } catch (err) {
      this.setState({ addError: err.message });
    }
  };
  render() {
    const { product, producer } = this.props;
    return (
      <div>
        <Grid container spacing={16} justify="center">
          <Grid item xs={6}>
            <img
              src={`/static${product.product_img}`}
              style={{ float: 'right', margin: '25px 100px 0 0' }}
              width="310px"
              height="370px"
            />
          </Grid>
          <Grid item xs={6}>
            <h1>{product.product_name}</h1>
            <h2 style={{ color: 'red' }}>${product.product_price}</h2>
            <h2 style={{ color: 'gray' }}>{producer.producer_name}</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
              Repellendus, tempore! Nulla consectetur quisquam excepturi <br />
              officiis, laboriosam vero tenetur ut! Nemo, officiis doloremque.{' '}
              <br />
              Omnis beatae molestiae neque commodi odio quibusdam quo.
            </p>
            <form noValidate onSubmit={this.hanldeSubmit}>
              <TextField
                name="quantity"
                onChange={this.handleChange}
                value={this.state.quantity}
                label="Quantity"
                type="number"
                autoComplete="off"
              />
              {this.state.addError && (
                <p style={{ color: 'red' }}>{this.state.addError}</p>
              )}
              <br />
              <Button
                style={{ marginTop: 20 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Add To Cart
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductDetails;
