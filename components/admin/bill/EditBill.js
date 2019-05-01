import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  CircularProgress
} from '@material-ui/core';
import { editBill, getBillsWithRedux } from '../../../store/action/billAction';
import { connect } from 'react-redux';
import CustomizedSnackbars from '../snackbar/CustomizedSnackbars';
import Link from 'next/link';
import { EditBillStyles } from './bill.styles.jss';

const styles = EditBillStyles;

class EditBill extends Component {
  state = {
    _id: '',
    authId: '',
    totalPrice: '',
    status: '',
    details: '',
    onLoading: '',
    message: '',
    open: false,
    bill: {}
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  validated__input = (stateValue, regex, inputName, setError) => {
    const value = stateValue;
    const input = document.getElementsByName(inputName)[0];
    if (setError) this.setState({ err: { [setError]: true } });

    if (!input) {
      return false;
    }
    if (!regex.exec(value)) {
      input.focus();
      input.click();
      return false;
    }
    if (regex.exec(value)[0] !== regex.exec(value).input) {
      input.focus();
      return false;
    }
    if (setError) this.setState({ err: { [setError.key]: false } });
    return true;
  };
  valudated__form = () => {
    if (!this.validated__input(this.state.bill_name, /[\w\s-]{1,}/, 'status')) {
      return false;
    }
    return true;
  };
  // submit edit
  handleSubmit = async e => {
    e.preventDefault();
    if (!this.valudated__form()) {
      return;
    }
    this.setState({ onLoading: true });
    await this.props.editBill(this.state);
    if (!this.props.editError) {
      this.setState({
        onLoading: false,
        open: true,
        message: `Edit ${this.state._id} success`
      });
    } else {
      alert('Permission Denied!');
      window.location = '/admin';
    }
  };
  async componentDidMount() {
    await this.props.getBillsWithRedux();
    if (this.props.haveBill) {
      const b = this.props.bill;
      let details = [];
      for (let i = 0; i < b.details.proId.length; i++) {
        const obj = {
          proId: b.details.proId[i],
          proPrice: b.details.proPrice[i],
          proQuantity: b.details.proQuantity[i]
        };
        details.push(obj);
      }

      this.setState({
        _id: b._id,
        createAt: b.createAt,
        authId: b.authId,
        totalPrice: b.totalPrice,
        status: b.status,
        details: details
      });
    }
  }
  render() {
    const { classes } = this.props;
    if (!this.state.details) {
      return <h2>Waiting...</h2>;
    }
    const rows = this.state.details;
    return (
      <div className={`${classes.root} fadeIn`}>
        <h2 className={classes.formTitle}>
          Edit Bill
          <Link href="/admin/bill">
            <a style={{ marginLeft: 200 }}>
              <Button variant="contained" color="default">
                Back
              </Button>
            </a>
          </Link>
        </h2>
        {this.props.haveBill ? (
          <Paper>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Bill Id : </b> {this.state._id}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Create At : </b> {this.state.createAt}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>User Id : </b> {this.state.authId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Total Price : </b> {this.state.totalPrice}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Status : </b>
                    <form
                      onSubmit={this.handleSubmit}
                      id="formEditBill"
                      style={{ display: 'inline' }}
                    >
                      <Select
                        value={this.state.status}
                        onChange={this.handleChange}
                        name="status"
                      >
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="unpaid">Unpaid</MenuItem>
                      </Select>
                      {this.state.onLoading ? (
                        <Button>
                          <CircularProgress
                            size={20}
                            className={classes.bgWhite}
                          />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          form="formEditBill"
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '10px' }}
                        >
                          Update
                        </Button>
                      )}
                    </form>
                    {this.props.editError && (
                      <h4 style={{ color: 'red' }}>{this.props.editError}</h4>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <h2 style={{ color: 'gray' }}>Details</h2>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">Product Id</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">
                            Product Price ($)
                          </TableCell>
                        </TableRow>
                        {rows.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">{item.proId}</TableCell>
                            <TableCell align="center">
                              {item.proQuantity}
                            </TableCell>
                            <TableCell align="center">
                              {item.proPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div onClick={this.handleClose}>
              <CustomizedSnackbars open={this.state.open}>
                {this.state.message}
              </CustomizedSnackbars>
            </div>
          </Paper>
        ) : (
          <h1>Not have this bill.</h1>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const bills = state.bill.bills;
  let bill = null;
  let haveBill = false;
  if (bills) {
    if (bills.data) {
      bill = bills.data.find(b => b._id === id);
      if (bill) {
        haveBill = true;
      }
    }
  }
  return {
    bill: bill,
    haveBill,
    editError: state.bill.editError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editBill: bill => dispatch(editBill(bill)),
    getBillsWithRedux: () => dispatch(getBillsWithRedux())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditBill)
);
