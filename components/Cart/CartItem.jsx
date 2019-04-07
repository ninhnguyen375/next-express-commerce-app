import React, { Component } from 'react';
import {
  TableRow,
  TableCell,
  Button,
  TextField,
  withStyles
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CartStyles from './Cart.styles.jss';

const styles = CartStyles;

class CartItem extends Component {
  render() {
    const { item, id, onDelete, classes } = this.props;
    return (
      <TableRow>
        <TableCell>{item.cartItem.proId}</TableCell>
        <TableCell>
          <img
            alt={"product img"}
            src={`/static${item.currPro.product_img}`}
            className={classes.image}
          />
        </TableCell>
        <TableCell>{item.currPro.product_name}</TableCell>
        <TableCell>
          <TextField
            value={item.cartItem.quantity}
            type="number"
            name="quantity"
            autoComplete="off"
            id={id}
            onChange={this.props.handleChange}
            className={classes.inputAmount}
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
export default withStyles(styles)(CartItem);
