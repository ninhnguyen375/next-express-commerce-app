import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { Component } from 'react';

class BillItem extends Component {
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
                <TableCell colSpan={7}>ID : {item.bill._id}</TableCell>
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
                <TableCell>ID</TableCell>
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
export default BillItem;
