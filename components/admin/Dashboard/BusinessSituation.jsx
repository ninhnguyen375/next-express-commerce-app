import React, { Component } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  LinearProgress
} from '@material-ui/core';
import Axios from 'axios';

export class BusinessSituation extends Component {
  async componentDidMount() {
    const statistical = await Axios.get('/api/dashboard');
    this.setState({ statistical: statistical.data });
  }
  state = {
    dateStart: '',
    dateEnd: '',
    statistical: {}
  };
  getStatistical = async () => {
    const statistical = await Axios.get(
      `/api/dashboard?dateStart=${this.state.dateStart}&dateEnd=${
        this.state.dateEnd
      }`
    );
    this.setState({ statistical: statistical.data });
  };
  handleChangeDate = async e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let statistialOfEachType = this.state.statistical.statistialOfEachType
      ? [...this.state.statistical.statistialOfEachType]
      : '';
    if (statistialOfEachType[0]) {
      statistialOfEachType = statistialOfEachType.sort((x1, x2) => {
        return x2.totalAmount - x1.totalAmount;
      });
    }
    return (
      <div>
        <h2 style={{ color: 'gray' }}>Business Situation</h2>
        {/* filter by day */}
        <TextField
          onChange={this.handleChangeDate}
          value={this.state.dateStart}
          type="date"
          name="dateStart"
        />
        <TextField
          onChange={this.handleChangeDate}
          value={this.state.dateEnd}
          type="date"
          name="dateEnd"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.getStatistical}
          size="small"
        >
          Filter
        </Button>
        <br />
        {/* map list */}
        <Grid container spacing={16} justify="flex-start">
          {statistialOfEachType &&
            statistialOfEachType.map((item, i) => (
              <Grid item xs={'auto'} md={3} key={i}>
                <Paper style={{ padding: 10, marginTop: 20 }}>
                  <h1 style={{ color: 'gray' }}>{item.type}</h1>
                  <p style={{ color: 'gray' }}>
                    Total Revenue:{' '}
                    <b style={{ color: '#ff835d' }}>${item.totalPrice}</b>
                  </p>
                  <p style={{ color: 'gray' }}>
                    Total Amout:{' '}
                    <b style={{ color: '#616161' }}>{item.totalAmount}</b>{' '}
                    Products
                  </p>
                  <LinearProgress
                    variant="determinate"
                    style={{ marginTop: 10, padding: 2 }}
                    value={
                      this.state.statistical.totalSoldProducts
                        ? (item.totalAmount /
                            this.state.statistical.totalSoldProducts) *
                          100
                        : 0
                    }
                    color={i === 0 ? 'secondary' : 'primary'}
                  />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

export default BusinessSituation;
