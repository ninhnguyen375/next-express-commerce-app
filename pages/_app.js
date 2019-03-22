import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import AdminMain from '../layouts/AdminMain';
import Main from '../layouts/Main';
import Router from 'next/router';
import Nprogress from 'nprogress';

Router.events.on('routeChangeStart', () => {
  Nprogress.start();
});
Router.events.on('routeChangeComplete', () => {
  Nprogress.done();
});
Router.events.on('routeChangeError', () => {
  Nprogress.done();
});

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>ShopPhone</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}

            <>
              {this.props.router.route.indexOf('/admin') !== -1 ? (
                <AdminMain>
                  <Component
                    query={this.props.query}
                    pageContext={this.pageContext}
                    {...pageProps}
                  />
                </AdminMain>
              ) : (
                <Main>
                  <Component
                    query={this.props.query}
                    pageContext={this.pageContext}
                    {...pageProps}
                  />
                </Main>
              )}
            </>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
