import React, { Component } from 'react';
import Bill from '../../components/admin/bill/Bill';
import EditBill from '../../components/admin/bill/EditBill';

export class product extends Component {
  render() {
    return (
      <>
        {this.props.query.id ? <EditBill id={this.props.query.id} /> : <Bill />}
      </>
    );
  }
}

export default product;
