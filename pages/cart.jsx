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
  TextField,
  Divider
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ShopContext from '../context/shop-context';

class CartItem extends Component {
  render() {
    const { item, id, onDelete } = this.props;
    return (
      <TableRow>
        <TableCell>{item.cartItem.proId}</TableCell>
        <TableCell>
          <img src={`/static${item.currPro.product_img}`} width="70px" />
        </TableCell>
        <TableCell>{item.currPro.product_name}</TableCell>
        <TableCell>
          <TextField
            value={item.cartItem.quantity}
            pattern="^[1-5]{1}$"
            type="number"
            name="quantity"
            autoComplete="off"
            id={id}
            onChange={this.props.handleChange(/^[1-5]{1}$/)}
          />
        </TableCell>
        <TableCell>{item.cartItem.proPrice}</TableCell>
        <TableCell>{item.cartItem.proPrice * item.cartItem.quantity}</TableCell>
        <TableCell>
          <Button onClick={onDelete(item.cartItem._id)}>
            <Delete color="error" />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export class cart extends Component {
  // Context API in React
  static contextType = ShopContext;

  state = {
    getError: '',
    carts: ''
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
    window.scrollTo({ top: 0 });
    await this.context.checkLogin();
    if (this.context.auth.auth_key) {
      await this.getCarts(this.context.auth.auth_key);
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
  handleChange = regex => e => {
    const { id, value } = e.target;
    const { carts } = this.state;
    if (!regex.test(value)) {
      e.target.focus();
      alert('1 to 5!');
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
      }
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>YOUR CART</h1>
        <Divider variant="middle" style={{ margin: '30px' }} />
        <Paper style={{ width: '80%', margin: 'auto' }}>
          {this.state.getError && (
            <p style={{ color: 'red' }}>{this.state.getError}</p>
          )}
          {this.state.carts[0] ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Id</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Product Price ($)</TableCell>
                  <TableCell>Total Item Price ($)</TableCell>
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
                  <TableCell colSpan={6}>{this.getTotalPrice()}</TableCell>
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
                    <b style={{ color: 'red' }}>${this.getTotalPrice()}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Link href="/">
                      <Button color="inherit" variant="contained">
                        Back To Shopping
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell colSpan={4}>
                    <Button
                      style={{ float: 'right' }}
                      variant="contained"
                      color="primary"
                      onClick={this.handleCheckout}
                    >
                      Check OutCart
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <>
              <h3 style={{ color: 'gray', textAlign: 'center', padding: 20 }}>
                Your cart is Empty
                <Link href="/">
                  <Button
                    style={{ marginLeft: 20 }}
                    variant="contained"
                    color="primary"
                  >
                    Go To Shopping
                  </Button>
                </Link>
              </h3>
            </>
          )}
        </Paper>
      </>
    );
  }
}

export default cart;
