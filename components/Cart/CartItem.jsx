import React, { Component } from 'react';
import {
  TableRow,
  TableCell,
  Button,
  TextField,
  withStyles
} from '@material-ui/core';
import { Delete, Remove, Add } from '@material-ui/icons';
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
            alt={'product img'}
            src={`/static${item.currPro.product_img}`}
            className={classes.image}
          />
        </TableCell>
        <TableCell>{item.currPro.product_name}</TableCell>
        <TableCell>
          <div className="group-btn-plus-and-minus">
            <button
              variant={'raised'}
              onClick={() => this.props.minusQuantity(id)}
              className="btn-minus"
            >
              <Remove color={'secondary'} fontSize={'small'} />
            </button>
            <input
              readOnly={true}
              type="text"
              value={item.cartItem.quantity}
              name="quantity"
              id={id}
              className="input-number"
            />
            <button
              variant={'raised'}
              onClick={() => this.props.plusQuantity(id)}
              className="btn-plus"
            >
              <Add fontSize={'small'} color={'primary'} />
            </button>
          </div>
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
