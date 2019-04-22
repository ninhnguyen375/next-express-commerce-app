import React, { Component } from 'react';
import Product from '../components/Product/Product';
import MySlider from '../components/Slider/MySlider';
import { Divider } from '@material-ui/core';
import GoToTop from '../components/GoToTop';
import CategoryList from '../components/CategoryList';
import Axios from 'axios';

const isServer = !process.browser;
const isProduction = !process.env.NODE_ENV === 'production';

export class index extends Component {
  static async getInitialProps(ctx) {
    const url = isServer
      ? `${isProduction ? 'https' : 'http'}://${
          ctx.req.headers.host
        }/api/producers`
      : '/api/producers';

    const categories = await Axios.get(url);
    if (!categories.data.err) {
      return { categories: categories.data.data };
    }
    return {};
  }

  state = {
    categories: [],
    query: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.categories) {
      return null;
    } else {
      return { categories: props.categories, query: props.query };
    }
  }

  componentDidMount() {
    window.onload = () => {
      const navbar = document.querySelector('.NavBar');
      const slider = document.querySelector('.slider');
      navbar.style.display = 'fixed';

      if (window.scrollY > slider.clientHeight - navbar.clientHeight) {
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.add('bg-transparent');
      }
    };
  }

  render() {
    const { categories, query } = this.state;

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
          <CategoryList categories={categories} selectedCategory={query} />
          <div />
          <h1 style={{ color: 'gray', textAlign: 'center', marginTop: 70 }}>
            Products
          </h1>
          <Divider style={{ margin: 30 }} />
          <Product category={query && query.category ? query.category : null} />

          <GoToTop />
        </div>
      </>
    );
  }
}

export default index;
