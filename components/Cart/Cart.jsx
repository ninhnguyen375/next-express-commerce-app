import React, { Component } from 'react';
import Link from 'next/link';
import Axios from 'axios';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider,
  withStyles
} from '@material-ui/core';
import ShopContext from '../../context/shop-context';
import CartItem from './CartItem';
import CartStyles from './Cart.styles.jss';
import Payment from '../Payment/Payment';
import moment from 'moment';

const styles = CartStyles;

class Cart extends Component {
  static contextType = ShopContext;

  state = {
    getError: '',
    carts: '',
    renderPayment: false,
    loading: true
  };

  getCarts = async userID => {
    try {
      const getCarts = await Axios.get(`/api/users/${userID}/carts`);
      if (getCarts.data.err) this.setState({ getError: getCarts.data.err });
      else {
        this.setState({
          carts: getCarts.data.makeupCarts
        });
      }
    } catch (err) {
      this.setState({ getError: err.message });
    }
  };

  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) {
      await this.getCarts(this.context.auth.auth_key);

      this.setState({ loading: false });
    } else {
      this.setState({ getError: 'You must to Login first!' });
    }
  }

  handleClickCheckout = async () => {
    try {
      let products = await Axios.get('/api/products');
      products = products.data.data;
      for (let i = 0; i < this.state.carts.length; i++) {
        const proId = this.state.carts[i].cartItem.proId;
        const proQuantity = this.state.carts[i].cartItem.quantity;

        const product = products.find(p => p.product_id === proId);
        if (product.quantity < proQuantity) {
          alert(`Product ${product.product_name} is out of stock!`);
        } else {
          this.setState({ renderPayment: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = id => async () => {
    try {
      const deleteCart = await Axios.delete('/api/carts/' + id);
      if (deleteCart.data.err) alert(deleteCart.data.err);
      else {
        this.getCarts(this.context.auth.auth_key);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  handleChange = e => {
    const { id, value } = e.target;
    const { carts } = this.state;
    if (value < 1 || value > 5) {
      alert('You must to buy 1 - 5 item for this product');
      return;
    }

    carts[id].cartItem.quantity = value;
    this.setState({ carts });
  };

  getTotalPrice = () => {
    let total = 0;
    this.state.carts.forEach(item => {
      total += item.cartItem.quantity * item.cartItem.proPrice;
    });
    return total;
  };

  handleCheckout = async () => {
    try {
      let proId = [];
      let proPrice = [];
      let proQuantity = [];

      for (let i = 0; i < this.state.carts.length; i++) {
        proId.push(this.state.carts[i].cartItem.proId);
        proPrice.push(this.state.carts[i].cartItem.proPrice);
        proQuantity.push(this.state.carts[i].cartItem.quantity);
      }

      const obj = {
        authId: this.context.auth.auth_key,
        createAt: moment().format('MM/DD/YYYY'),
        totalPrice: this.getTotalPrice(),
        status: 'unpaid',
        details: {
          proId,
          proPrice,
          proQuantity
        }
      };

      const checkout = await Axios.post('/api/bills', obj);

      if (checkout.data.err) alert(checkout.data.err);
      else {
        alert('Check Out Success ');
        this.getCarts(this.context.auth.auth_key);
        this.setState({ renderPayment: false });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <style jsx global>{`
          * {
            scroll-behavior: smooth;
          }
        `}</style>
        <h1 className={classes.header}>YOUR CART</h1>
        <div className="divider" />

        <Paper className={classes.paper + ' ' + classes.root}>
          {this.state.loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            <>
              {this.state.renderPayment ? (
                <Payment onCheckOut={this.handleCheckout} />
              ) : (
                <>
                  {this.state.carts[0] ? (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price ($)</TableCell>
                          <TableCell>Total Price ($)</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.carts.map((item, index) => (
                          <CartItem
                            key={index}
                            item={item}
                            onDelete={this.handleDelete}
                            id={index.toString()}
                            handleChange={this.handleChange}
                          />
                        ))}

                        <TableRow>
                          <TableCell colSpan={6} align="right">
                            <h4>SUMMARY</h4>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} align="right">
                            Total Price :
                          </TableCell>
                          <TableCell colSpan={6}>
                            {this.getTotalPrice()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} align="right">
                            Shipping :
                          </TableCell>
                          <TableCell colSpan={6}>$0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6} align="right">
                            Result :
                          </TableCell>
                          <TableCell colSpan={6}>
                            <b style={{ color: 'red' }}>
                              ${this.getTotalPrice()}
                            </b>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Link href="/">
                              <a>
                                <Button
                                  color="secondary"
                                  style={{ display: 'block', width: '100%' }}
                                  variant="contained"
                                >
                                  Back To Shopping
                                </Button>
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell />
                          <TableCell colSpan={3}>
                            <a href="#">
                              <Button
                                style={{ display: 'block', width: '100%' }}
                                variant="contained"
                                color="primary"
                                onClick={this.handleClickCheckout}
                              >
                                Check Out
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <>
                      <h3 className={classes.textGrayCenter}>
                        {this.state.getError ? (
                          <p className={classes.textError}>
                            {this.state.getError}
                          </p>
                        ) : (
                          'Your cart is Empty'
                        )}
                        <Link href="/">
                          <a>
                            <Button
                              style={{ marginLeft: 20 }}
                              variant="contained"
                              color="primary"
                            >
                              Go To Shopping
                            </Button>
                          </a>
                        </Link>
                      </h3>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Cart);
