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

const styles = CartStyles;

class Cart extends Component {
  // Context API in React
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
  handleDelete = id => async e => {
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
        createAt: new Date(),
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
        <Divider variant="middle" className={classes.margin30} />

        <Paper className={classes.paper + ' ' + classes.root}>
          {this.state.loading ? (
            <h2 className={classes.textGrayCenter}>Loading...</h2>
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
                                onClick={() => {
                                  this.setState({ renderPayment: true });
                                }}
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
