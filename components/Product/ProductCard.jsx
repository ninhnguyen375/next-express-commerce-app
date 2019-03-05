import React, { Component } from 'react';
import Link from 'next/link';
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Card
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
export class ProductCard extends Component {
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
        <Link href={`/product?id=${this.props.product._id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              width="220px"
              image={`/static${this.props.product.product_img}`}
            />
            <CardContent>
              <Typography variant="h6">
                {this.props.product.product_name}
              </Typography>
              <Typography variant="h6" color="error">
                ${this.props.product.product_price}
              </Typography>
              <Typography component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi non iste eaque
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions style={{ alignSelf: 'flex-end' }}>
          <Button variant="outlined" color="primary">
            Add To Cart <AddShoppingCart style={{ marginLeft: 5 }} />
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default ProductCard;
