import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations']
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one'
    ]
  },
  {
    title: 'Resources',
    description: [
      'Resource',
      'Resource name',
      'Another resource',
      'Final resource'
    ]
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use']
  }
];
export class Footer extends Component {
  render() {
    return (
      <>
        {/* Footer */}
        <style jsx global>{`
          footer {
            padding: 30px;
            text-align: center;
            border-top: 1px solid #d8d8d8;
            margin-top: 50px;
            background: #3e3e3e;
            color: white;
          }
          h6 {
            color: e0e0e0 !important;
          }
          a {
            text-decoration: none;
            color: #69afea;
          }
        `}</style>
        <footer>
          <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs key={footer.title}>
                <Typography variant="h6" color="inherit" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography key={item} variant="subtitle1" color="inherit">
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
          <p>
            &copy;{' '}
            <a
              style={{ color: 'white' }}
              href="https://github.com/ninhnguyen375"
            >
              Ninh Nguyen
            </a>{' '}
            |{' '}
            <a href="https://github.com/ninhnguyen375/simple-next-materialui-setup">
              Project on GitHub
            </a>
          </p>
        </footer>
        {/* End footer */}
      </>
    );
  }
}

export default Footer;
