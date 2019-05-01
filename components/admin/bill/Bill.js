import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import BillList from './BillList';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  getBillsWithRedux,
  closeAlertDeleted
} from '../../../store/action/billAction';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import Axios from 'axios';

const styles = () => ({
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
    borderRadius: '7px',
    padding: 20
  },
  header: {
    fontSize: '1.7em',
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  m_20: {
    margin: 20
  }
});
export class Bill extends Component {
  state = {
    openSnackNumDeleted: false,
    messDeleted: '',
    adminAccess: true
  };

  async componentDidMount() {
    const admin_key = JSON.parse(
      window.sessionStorage.getItem('adminPageAccess')
    ).admin_key;
    const admin = await Axios.get(`/api/users/${admin_key}/adminPermission`);
    if (!admin.data.admin.bill) {
      this.setState({ ...this.state, adminAccess: false });
      return;
    } else {
      this.setState({ ...this.state, adminAccess: true });
      this.props.getBillsWithRedux();
    }
  }

  handleClose = () => {
    this.setState({ openSnackNumDeleted: false });
    this.props.closeAlertDeleted();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.numDeleted) {
      this.setState({
        ...this.state,
        openSnackNumDeleted: true,
        messDeleted: `${nextProps.numDeleted} bills has been deleted`
      });
    }
  }

  render() {
    const { classes, numDeleted } = this.props;
    return (
      <>
        {this.state.adminAccess ? (
          <>
            <div className="admin-content fadeIn">
              <div className="admin-content-header">Bill Manager</div>
              <div className="divider" />
              {/* List Bill */}
              {this.props.bills ? (
                <BillList bills={this.props.bills.data} />
              ) : (
                <div className="loading-text">Loading...</div>
              )}
            </div>

            {numDeleted && (
              <div onClick={this.handleClose}>
                <CustomizedSnackbars open={this.state.openSnackNumDeleted}>
                  {this.state.messDeleted}
                </CustomizedSnackbars>
              </div>
            )}
          </>
        ) : (
          <>{Router.push('/admin')}</>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    bills: state.bill.bills,
    numDeleted: state.bill.numDeleted
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBillsWithRedux: () => dispatch(getBillsWithRedux()),
    closeAlertDeleted: () => dispatch(closeAlertDeleted())
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bill)
);
