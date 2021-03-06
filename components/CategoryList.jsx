import React from 'react';
import Link from 'next/link';
import { Divider } from '@material-ui/core';

class CategoryList extends React.Component {
  state = {
    anchorEl: null,
    categories: []
  };

  render() {
    const { category } = this.props.selectedCategory;
    return (
      <div>
        <h1 className="header">Categories</h1>
        <div className="divider" />
        <div className="CategoryList">
          {this.props.categories && (
            <>
              {this.props.categories.map(item => (
                <Link
                  key={item._id}
                  href={`/?category=${item.producer_id}#content`}
                >
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
