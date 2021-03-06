import React, { Component } from 'react';
import { ShoppingCart } from '@material-ui/icons';
import Link from 'next/link';
import ShopContext from '../../context/shop-context';
import Axios from 'axios';

class ProductCard extends Component {
  static contextType = ShopContext;
  state = {
    addError: '',
    addSuccess: false,
    isLoading: false
  };

  componentWillMount() {
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this.setState({ addSuccess: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.product !== nextProps.product || nextState !== this.state;
  }

  handleAddToCart = async () => {
    const { auth } = this.context;
    if (!auth || !auth.auth_key) {
      alert('You must to Login First!');
      return;
    }
    this.setState({ isLoading: true });
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
    this.setState({ isLoading: false });
  };

  render() {
    const { product } = this.props;
    return (
      <div className="ProductCard">
        <div className="card-image">
          <div className="card-image-wrap">
            <Link href={`/product?id=${product._id}`}>
              <a>
                <img src={`/static${product.product_img}`} alt="img" />
              </a>
            </Link>

            {this.state.addError ? (
              <div style={{ color: 'red' }}>{this.state.addError}</div>
            ) : (
              <>
                {this.state.addSuccess ? (
                  <Link href={'/cart'}>
                    <a>
                      <div className="btn-cart active">
                        <ShoppingCart />
                      </div>
                    </a>
                  </Link>
                ) : (
                  <div className="btn-cart" onClick={this.handleAddToCart}>
                    {this.state.isLoading ? '...' : <ShoppingCart />}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Link href={`/product?id=${product._id}`}>
          <a>
            <div className="card-content">
              <div className="card-title">{product.product_name}</div>
              <div className="card-title text-gray">{product.producer}</div>
              <div className="price">{product.product_price}</div>
            </div>{' '}
          </a>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
