import React, { Component } from 'react';
import Axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import {
  MonetizationOn,
  Store,
  ListAlt,
  FeaturedPlayList,
  People,
  Inbox
} from '@material-ui/icons';

export class Overview extends Component {
  state = {
    statistical: ''
  };
  async componentDidMount() {
    const statistical = await Axios.get('/api/dashboard');
    this.setState({ statistical: statistical.data });
  }
  render() {
    const cards = [
      {
        cardColor: '#f86c6b',
        cardTitle: 'Total Revenue ($)',
        cardDescription: `$${this.state.statistical.totalRevenue}`,
        cardIcon: () => (
          <MonetizationOn
            style={{ fontSize: 70, color: '#ffffff80' }}
            color="inherit"
          />
        )
      },
      {
        cardColor: 'rgb(79, 141, 255)',
        cardTitle: 'Total Products',
        cardDescription: this.state.statistical.totalProducts,
        cardIcon: () => (
          <Store style={{ fontSize: 70, color: '#ffffff80' }} color="inherit" />
        )
      },
      {
        cardColor: 'rgb(126, 79, 202)',
        cardTitle: 'Total Bills',
        cardDescription: this.state.statistical.totalBills,
        cardIcon: () => (
          <ListAlt
            style={{ fontSize: 70, color: '#ffffff80' }}
            color="inherit"
          />
        )
      },
      {
        cardColor: 'rgb(64, 138, 45)',
        cardTitle: 'Total Categories',
        cardDescription: this.state.statistical.totalCategories,
        cardIcon: () => (
          <FeaturedPlayList
            style={{ fontSize: 70, color: '#ffffff80' }}
            color="inherit"
          />
        )
      },
      {
        cardColor: 'rgb(88, 98, 171)',
        cardTitle: 'Total Users',
        cardDescription: this.state.statistical.totalUsers,
        cardIcon: () => (
          <People
            style={{ fontSize: 70, color: '#ffffff80' }}
            color="inherit"
          />
        )
      },
      {
        cardColor: 'rgb(39, 39, 39)',
        cardTitle: 'Total Sold Products',
        cardDescription: this.state.statistical.totalSoldProducts,
        cardIcon: () => (
          <Inbox style={{ fontSize: 70, color: '#ffffff80' }} color="inherit" />
        )
      }
    ];
    return (
      <div>
        {this.state.statistical ? (
          <Grid container spacing={16}>
            {cards &&
              cards.map(card => (
                <Grid
                  key={card.cardTitle}
                  item
                  xs={'auto'}
                  style={{ minWidth: '270px' }}
                  lg={3}
                  md={3}
                  sm={12}
                >
                  <Paper style={{ padding: 10, background: card.cardColor }}>
                    <Grid container spacing={16}>
                      <Grid item xs={8}>
                        <div
                          style={{
                            color: 'white',
                            fontSize: 30,
                            textShadow: '0 0 5px white'
                          }}
                        >
                          {card.cardDescription}
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        {card.cardIcon()}
                      </Grid>
                      <Grid item xs={8}>
                        <b style={{ color: 'white' }}>{card.cardTitle}</b>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        ) : (
          <div className="loading-text">Loading...</div>
        )}
      </div>
    );
  }
}

export default Overview;
