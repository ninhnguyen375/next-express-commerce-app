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
  Divider
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ShopContext from '../context/shop-context';

class BillDetails extends Component {
  render() {
    const { item, onDelete } = this.props;
    return (
      <>
        <h2
          style={{
            marginTop: 50,
            color: 'gray',
            padding: 20,
            textAlign: 'center'
          }}
        >
          THE BILL
        </h2>
        <Paper style={{ margin: 'auto', width: '90%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={7}>Bill ID : {item.bill._id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>
                  Create At : {item.bill.createAt}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>
                  Total Price : ${item.bill.totalPrice}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>Status : {item.bill.status}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price ($)</TableCell>
                <TableCell>Quatity</TableCell>
                <TableCell>Total ($)</TableCell>
              </TableRow>
              {item.productsOfBill.map(product => (
                <TableRow key={product._doc.product_id}>
                  <TableCell>{product._doc.product_id}</TableCell>
                  <TableCell>
                    <img
                      src={'/static' + product._doc.product_img}
                      width="80px"
                      alt="product image"
                    />
                  </TableCell>
                  <TableCell>{product._doc.product_name}</TableCell>
                  <TableCell>${product.product_price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    ${product.product_price * product.quantity}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={7} align="right">
                  <Button onClick={onDelete(item.bill._id)}>
                    <Delete color="error" />{' '}
                    <span style={{ color: 'red' }}>Cancel</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export class bill extends Component {
  // Context API in React
  static contextType = ShopContext;

  state = {
    getError: '',
    bills: []
  };

  getBills = async userID => {
    try {
      const getBills = await Axios.get(`/api/users/${userID}/bills`);
      if (getBills.data.err) this.setState({ getError: getBills.data.err });
      else {
        this.setState({
          bills: getBills.data.makeupBills
        });
      }
    } catch (err) {
      this.setState({ getError: err.message });
    }
  };
  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) {
      await this.getBills(this.context.auth.auth_key);
    } else {
      this.setState({ getError: 'You must to Login first!' });
    }
  }
  handleDelete = id => async e => {
    if (!confirm('Are you sure to Cancel this Bill?')) {
      return;
    }
    try {
      const deleteBill = await Axios.delete('/api/bills/' + id);
      if (deleteBill.data.err) alert(deleteBill.data.err);
      else {
        this.getBills(this.context.auth.auth_key);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>YOUR BILLS</h1>
        <Divider variant="middle" style={{ margin: '30px' }} />
        <Paper
          style={{ width: '80%', margin: 'auto', paddingBottom: 50 }}
        >
          {this.state.getError && (
            <p style={{ color: 'red' }}>{this.state.getError}</p>
          )}
          {this.state.bills[0] ? (
            this.state.bills.map(bill => (
              <BillDetails
                key={bill.bill._id}
                onDelete={this.handleDelete}
                item={bill}
              />
            ))
          ) : (
            <>
              <h3 style={{ color: 'gray', textAlign: 'center', padding: 20 }}>
                Empty
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

export default bill;
