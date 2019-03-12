import React, { Component } from 'react';
import Category from '../../components/admin/category/Category';
import EditCategory from '../../components/admin/category/EditCategory';

export class category extends Component {
  render() {
    return (
      <>
        {this.props.query.id ? (
          <EditCategory id={this.props.query.id} />
        ) : (
          <Category />
        )}
      </>
    );
  }
}

export default category;
