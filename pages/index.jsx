import React, { Component } from 'react';
import Product from '../components/Product/Product';
import MySlider from '../components/Slider/MySlider';
import { Divider } from '@material-ui/core';
import GoToTop from '../components/GoToTop';
import CategoryList from '../components/CategoryList';
import Axios from 'axios';

export class index extends Component {
  static async getInitialProps(ctx) {
    let url = '';
    if (!ctx.req || !ctx.req.headers) {
      url = `/api/producers`;
    } else {
      url = `https://${ctx.req.headers.host}/api/producers`;
    }
    const categories = await Axios.get(url);
    if (!categories.data.err) {
      return { categories: categories.data.data };
    }
    return {};
  }

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
          <CategoryList
            categories={this.props.categories}
            selectedCategory={this.props.query}
          />
          <div />
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
