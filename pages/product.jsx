import React, { Component } from 'react';
import Axios from 'axios';
import ProductDetails from '../components/Product/ProductDetails';
import { Divider } from '@material-ui/core';

class product extends Component {
  state = {
    product: '',
    producer: '',
    getError: ''
  };
  static async getInitialProps({ query }) {
    return { id: query.id };
  }
  async componentDidMount() {
    try {
      const promiseData = await Axios.get(`/api/products/${this.props.id}`);
      if (promiseData.data) {
        if (promiseData.data.err)
          this.setState({ getError: promiseData.data.err });
        else
          this.setState({
            product: promiseData.data.product,
            producer: promiseData.data.producer
          });
      } else this.setState({ getError: 'server not response' });
    } catch (err) {
      this.setState({ getError: err.message });
    }
  }
  render() {
    return (
      <>
        <h1 style={{ color: 'gray', textAlign: 'center' }}>Product Details</h1>
        <Divider />
        {this.state.product ? (
          <>
            {this.state.getError ? (
              <h3 style={{ color: 'gray', textAlign: 'center' }}>
                {this.state.getError}
              </h3>
            ) : (
              <ProductDetails
                product={this.state.product}
                producer={this.state.producer}
              />
            )}
          </>
        ) : (
          <h3 style={{ color: 'gray', textAlign: 'center' }}>Loading...</h3>
        )}
      </>
    );
  }
}

export default product;
