import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import BusinessSituation from './BusinessSituation';
import TopSellerProducts from './TopSellerProducts';
import Overview from './Overview';
import TopUsers from './TopUsers';

export class Dashboard extends Component {
  render() {
    return (
      <div className="admin-content fadeIn">
        <div className="admin-content-header">Dash Board</div>

        <div className="divider" />
        <Overview />

        <div className="divider" />
        <BusinessSituation />

        <div className="divider" />
        <TopSellerProducts />

        <div className="divider" />
        <TopUsers />
      </div>
    );
  }
}

export default Dashboard;
