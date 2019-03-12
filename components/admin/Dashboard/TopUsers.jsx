import React, { Component } from 'react';
import Axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Paper
} from '@material-ui/core';

export class TopUsers extends Component {
  state = {
    statistical: ''
  };
  async componentDidMount() {
    const statistical = await Axios.get('/api/dashboard');
    this.setState({ statistical: statistical.data });
  }
  render() {
    return (
      <>
        <h2 style={{ color: 'gray' }}>Top Users</h2>
        <Paper>
          {this.state.statistical ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Top</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone NUmber</TableCell>
                  <TableCell>Total Paid Price</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.statistical.topUsers &&
                  this.state.statistical.topUsers
                    .slice(0, 10)
                    .map((item, i) => (
                      <TableRow key={item.user._id}>
                        <TableCell>
                          <Fab
                            variant="extended"
                            size="small"
                            color={i === 0 ? 'secondary' : 'primary'}
                            style={{ boxShadow: 'none' }}
                          >
                            {i + 1}
                          </Fab>
                        </TableCell>
                        <TableCell>{item.user._id}</TableCell>
                        <TableCell>{item.user.user_name}</TableCell>
                        <TableCell>{item.user.user_email}</TableCell>
                        <TableCell>{item.user.user_phone}</TableCell>
                        <TableCell>
                          <b style={{ color: 'red' }}>${item.paidMoney}</b>
                        </TableCell>
                        <TableCell>
                          {item.user.user_status.toString()}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          ) : (
            <div>Loading...</div>
          )}
        </Paper>
      </>
    );
  }
}

export default TopUsers;
