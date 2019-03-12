import React, { Component } from 'react';
import Product from '../components/Product/Product';
import MySlider from '../components/Slider/MySlider';
import { Divider } from '@material-ui/core';
import GoToTop from '../components/GoToTop';

export class index extends Component {
  render() {
    return (
      <>
        <style jsx global>{`
          * {
            scroll-behavior: smooth;
          }
        `}</style>
        <div>
          <MySlider />
          <div id="content" />
          <h1 style={{ color: 'gray', textAlign: 'center', marginTop: 70 }}>
            Products
          </h1>
          <Divider style={{ margin: 30 }} />
          <Product
            category={
              this.props.query && this.props.query.category
                ? this.props.query.category
                : null
            }
          />
          <GoToTop />
        </div>
      </>
    );
  }
}

export default index;
