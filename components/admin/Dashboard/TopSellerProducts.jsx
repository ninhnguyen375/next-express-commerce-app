import React, { Component } from 'react';
import {
  TextField,
  Button,
  Grid,
  Fab,
  Paper,
  LinearProgress
} from '@material-ui/core';
import Axios from 'axios';

export class TopSellerProducts extends Component {
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
    return (
      <div>
        <h2 style={{ color: 'gray' }}>Top Seller Products</h2>
        {/* filter by date */}
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
        <br />

        {/* map list */}
        <Grid container spacing={16} justify="flex-start" alignItems="stretch">
          {this.state.statistical.soldProducts &&
            this.state.statistical.soldProducts
              .sort((x1, x2) => x1.amount - x2.amount < 1)
              .slice(0, 10)
              .map((item, i) => (
                <Grid item xs={6} md={3} key={i} style={{ padding: 10 }}>
                  <Paper style={{ padding: 10, height: '100%' }}>
                    {/* Top Number */}
                    <Fab
                      variant="round"
                      size="small"
                      color={i === 0 ? 'secondary' : 'primary'}
                      style={{ boxShadow: 'none' }}
                    >
                      {i + 1}
                    </Fab>

                    {/* Image */}
                    <img
                      alt="product_img"
                      src={`/static${item.details.product_img}`}
                      width={100}
                    />

                    {/* Info */}
                    <h3 style={{ color: 'gray' }}>
                      {item.details.product_name}
                    </h3>
                    <p>Type: {item.details.producer}</p>
                    <p>Total Revenue: ${item.totalPrice}</p>
                    <p>Total Amout: {item.amount}</p>

                    {/* Progress bar */}
                    <LinearProgress
                      variant="determinate"
                      style={{ marginTop: 10, padding: 2 }}
                      value={
                        (item.amount /
                          this.state.statistical.totalSoldProducts) *
                        100
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

export default TopSellerProducts;
