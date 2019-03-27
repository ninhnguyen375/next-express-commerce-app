import './CategoryList.scss';
import React from 'react';
import Axios from 'axios';
import Link from 'next/link';
import { Divider } from '@material-ui/core';

class CategoryList extends React.Component {
  state = {
    anchorEl: null,
    categories: []
  };
  async componentDidMount() {
    const categories = await Axios.get('/api/producers');
    if (!categories.data.err) {
      this.setState({ ...this.state, categories: categories.data.data });
    }
  }

  render() {
    const { category } = this.props.selectedCategory;
    return (
      <div>
        <h1 className="header">Categories</h1>
        <Divider />
        <div className="CategoryList">
          {this.state.categories && (
            <>
              {this.state.categories.map(item => (
                <Link key={item._id} href={'/?category=' + item.producer_id}>
                  <a>
                    <div
                      data-aos="fade-up"
                      className={
                        category === item.producer_id ? 'item active' : 'item'
                      }
                    >
                      {item.producer_name}
                    </div>
                  </a>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default CategoryList;
