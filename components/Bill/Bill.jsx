import React, { Component } from 'react';
import Link from 'next/link';
import Axios from 'axios';
import { Paper, Button, Divider, withStyles } from '@material-ui/core';
import ShopContext from '../../context/shop-context';
import BillItem from './BillItem';
import BillStyles from './Bill.styles.jss';

const styles = BillStyles;
class Bill extends Component {
  // Context API in React
  static contextType = ShopContext;

  state = {
    getError: '',
    bills: [],
    loading: true
  };

  getBills = async userID => {
    try {
      const getBills = await Axios.get(`/api/users/${userID}/bills`);

      if (getBills.data.err) this.setState({ getError: getBills.data.err });
      else {
        this.setState({
          bills: getBills.data.makeupBills
        });
      }
    } catch (err) {
      this.setState({ getError: err.message });
    }
    this.setState({ loading: false });
  };

  async componentDidMount() {
    await this.context.checkLogin();
    if (this.context.auth.auth_key) {
      await this.getBills(this.context.auth.auth_key);
    } else {
      this.setState({ getError: 'You must to Login first!' });
    }
  }

  handleDelete = id => async e => {
    if (!confirm('Are you sure to Cancel this Bill?')) {
      return;
    }
    try {
      const deleteBill = await Axios.delete('/api/bills/' + id);
      if (deleteBill.data.err) alert(deleteBill.data.err);
      else {
        this.getBills(this.context.auth.auth_key);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <h1 className={classes.header}>YOUR BILLS</h1>
        <Divider variant="middle" className={classes.margin30} />

        <Paper className={classes.paper + ' ' + classes.root}>
          {this.state.loading ? (
            <h2 className={classes.textGrayCenter}>Loading...</h2>
          ) : (
            <>
              {this.state.getError && (
                <p className={classes.textError}>{this.state.getError}</p>
              )}
              {this.state.bills[0] ? (
                this.state.bills.map(bill => (
                  <BillItem
                    key={bill.bill._id}
                    onDelete={this.handleDelete}
                    item={bill}
                  />
                ))
              ) : (
                <>
                  <h3 className={classes.textGrayCenter}>
                    {this.state.getError ? (
                      <p style={{ color: 'red' }}>{this.state.getError}</p>
                    ) : (
                      'Empty'
                    )}
                    <Link href="/">
                      <a>
                        <Button
                          style={{ marginLeft: 20 }}
                          variant="contained"
                          color="primary"
                        >
                          Go To Shopping
                        </Button>
                      </a>
                    </Link>
                  </h3>
                </>
              )}
            </>
          )}
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Bill);
