import React, { Component } from 'react';
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Card
} from '@material-ui/core';
import { AddShoppingCart, ShoppingCart } from '@material-ui/icons';
import ShopContext from '../../context/shop-context';
import Axios from 'axios';
import Link from 'next/link';

export class ProductCard extends Component {
  static contextType = ShopContext;

  state = {
    addError: '',
    addSuccess: false
  };

  componentWillUnmount() {
    this.setState({ addSuccess: false });
  }

  handleAddToCart = async () => {
    const { auth } = this.context;
    if (!auth || !auth.auth_key) {
      alert('You must to Login First!');
      return;
    }
    try {
      const addCart = await Axios.post('/api/carts', {
        userId: auth.auth_key,
        quantity: 1,
        proId: this.props.product.product_id,
        proPrice: this.props.product.product_price
      });
      if (addCart.data.err) this.setState({ addError: addCart.data.err });
      else {
        this.setState({ addSuccess: true });
      }
    } catch (err) {
      this.setState({ addError: err.message });
    }
  };
  render() {
    return (
      <Card
        style={{
          width: 230,
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <style jsx global>{`
          * {
            animation: none;
          }
        `}</style>
        {this.state.addError && console.log(this.state.addError)}
        <Link href={`/product?id=${this.props.product._id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              width="220px"
              image={`/static${this.props.product.product_img}`}
            />
            <CardContent>
              <h3>{this.props.product.product_name}</h3>

              <h3 style={{ color: 'gray' }}>{this.props.product.producer}</h3>

              <h3 style={{ color: 'red' }}>
                ${this.props.product.product_price}
              </h3>
              {/* <Typography component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography> */}
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions style={{ alignSelf: 'flex-end' }}>
          {this.state.addError ? (
            <div style={{ color: 'red' }}>{this.state.addError}</div>
          ) : (
            <>
              {this.state.addSuccess ? (
                <Link href="/cart">
                  <a>
                    <Button variant="contained" color="primary">
                      In Your Cart
                      <ShoppingCart style={{ marginLeft: 5 }} />
                    </Button>
                  </a>
                </Link>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleAddToCart}
                >
                  Add To Cart <AddShoppingCart />
                </Button>
              )}
            </>
          )}
        </CardActions>
      </Card>
    );
  }
}

export default ProductCard;
