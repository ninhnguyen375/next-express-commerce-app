import React, { Component } from 'react';
import Product from '../components/Product/Product';
import MySlider from '../components/Slider/MySlider';
import { Divider } from '@material-ui/core';

export class index extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }
  render() {
    return (
      <>
        <MySlider />
        <div id="content" />
        <h1 style={{ color: 'gray', textAlign: 'center', marginTop: 70 }}>
          Products
        </h1>
        <Divider style={{ margin: 30 }} />
        <Product category={this.props.query.category || null} />
      </>
    );
  }
}

export default index;
