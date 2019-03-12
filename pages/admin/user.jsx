import React, { Component } from 'react';
import User from '../../components/admin/user/User';
import EditUser from '../../components/admin/user/EditUser';

export class user extends Component {
  render() {
    return (
      <>
        {this.props.query.id ? <EditUser id={this.props.query.id} /> : <User />}
      </>
    );
  }
}

export default user;
