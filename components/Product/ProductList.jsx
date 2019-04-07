import React, { Component } from "react";
import { Fab, Grid } from "@material-ui/core";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage
} from "@material-ui/icons";

export class ProductList extends Component {
  state = {
    productsOnPage: null,
    pages: 1,
    currentPageButton: 1
  };

  renderPage = products => {
    this.setState({
      productsOnPage: products.slice(0, 8),
      pages: Math.ceil(products.length / 8)
    });
  };

  componentDidMount() {
    this.renderPage(this.props.products);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.products !== nextProps.products)
      this.renderPage(nextProps.products);
  }

  handleChangePage = page => () => {
    if (!page) return;
    const start = (page - 1) * 8;
    const end = page * 8;
    this.setState({
      ...this.state,
      productsOnPage: this.props.products.slice(start, end),
      currentPageButton: page
    });
  };

  handleClickPrevPage = () => {
    this.handleChangePage(this.state.currentPageButton - 1);
  };
  handleClickNextPage = () => {
    this.handleChangePage(this.state.currentPageButton + 1);
  };

  // get page buttons
  pageButtons = () => {
    let pageButtons = [];
    if (this.state.currentPageButton > 1) {
      pageButtons.push(
        <a href="#content" key="firstPage">
          <Fab
            onClick={this.handleChangePage(1)}
            size="small"
            style={{ margin: 5 }}
          >
            <FirstPage />
          </Fab>
        </a>
      );
      pageButtons.push(
        <a key="prevPage" href="#content">
          <Fab
            onClick={this.handleChangePage(this.state.currentPageButton - 1)}
            size="small"
            style={{ margin: 5 }}
            color={"default"}
          >
            <ChevronLeft />
          </Fab>
        </a>
      );

      if (this.state.currentPageButton - 2 > 0) {
        pageButtons.push(
          <Fab
            key={"hiddenPageLeft"}
            size="small"
            title={`1 - ${this.state.currentPageButton - 2}`}
            style={{ margin: 5, boxShadow: "none" }}
          >
            {"..."}
          </Fab>
        );
      }
    }
    for (
      let i = this.state.currentPageButton - 1;
      i <= this.state.currentPageButton + 1 && i <= this.state.pages;
      i++
    ) {
      if (i === 0) continue;
      pageButtons.push(
        <a href={"#content"} key={i}>
          <Fab
            onClick={this.handleChangePage(i)}
            size="small"
            style={{ margin: 5, boxShadow: "none" }}
            color={this.state.currentPageButton === i ? "primary" : "default"}
          >
            {i}
          </Fab>
        </a>
      );
    }
    if (this.state.currentPageButton < this.state.pages) {
      if (this.state.currentPageButton + 2 < this.state.pages) {
        pageButtons.push(
          <Fab
            key={"hiddenPageRight"}
            title={`${this.state.currentPageButton + 2} - ${this.state.pages}`}
            size="small"
            style={{ margin: 5, boxShadow: "none" }}
          >
            {"..."}
          </Fab>
        );
      }
      pageButtons.push(
        <a href="#content" key="nextPage">
          <Fab
            onClick={this.handleChangePage(this.state.currentPageButton + 1)}
            size="small"
            style={{ margin: 5 }}
          >
            <ChevronRight />
          </Fab>
        </a>
      );
      pageButtons.push(
        <a href="#content" key="lastPage">
          <Fab
            onClick={this.handleChangePage(this.state.pages)}
            size="small"
            style={{ margin: 5 }}
          >
            <LastPage />
          </Fab>
        </a>
      );
    }
    return pageButtons;
  };

  render() {
    return (
      <>
        {/* List Products */}
        <div className={"product-list__container"}>
          {this.state.productsOnPage &&
            this.state.productsOnPage.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
        {/* Page Buttons */}
        {this.state.pages !== 1 && (
          <Grid
            container
            justify="center"
            style={{
              marginTop: 30
            }}
          >
            {this.pageButtons().map(btn => btn)}
          </Grid>
        )}
      </>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
