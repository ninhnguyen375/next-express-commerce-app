import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component {
  render() {
    return (
      <footer className="admin-footer">
        <div className="left-content">
          <Link href="/">
            <a>&copy; ShopPhone</a>
          </Link>
        </div>
        <div className="right-content">
          <a
            target="blank"
            href="https://github.com/ninhnguyen375/next-express-commerce-app"
          >
            Project on Github
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
