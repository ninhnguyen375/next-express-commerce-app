import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import {
  Store,
  People,
  ListAlt,
  FeaturedPlayList,
  Dashboard
} from '@material-ui/icons';
import Link from 'next/link';
import Router from 'next/router';

export class Sidebar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  handleSidebarClick = () => {
    if (window.screen.width <= '538') {
      window.document.getElementsByClassName('sidebar')[0].style.display =
        'none';
      window.document.getElementsByClassName('App')[0].style.marginLeft = '0';
    }
  };

  render() {
    const NavLinks = [
      {
        href: '/admin',
        icon: <Dashboard />,
        text: 'Dashboard',
        hidden: false
      },
      {
        href: '/admin/product',
        icon: <Store />,
        text: 'Product',
        hidden: !this.props.adminPermission.product
      },
      {
        href: '/admin/user',
        icon: <People />,
        text: 'User',
        hidden: !this.props.adminPermission.user
      },
      {
        href: '/admin/bill',
        icon: <ListAlt />,
        text: 'Bill',
        hidden: !this.props.adminPermission.bill
      },
      {
        href: '/admin/category',
        icon: <FeaturedPlayList />,
        text: 'Category',
        hidden: !this.props.adminPermission.category
      }
    ];

    const { route } = Router;
    console.log(route);

    return (
      <div>
        <List className="sidebar">
          {/* Product */}
          {NavLinks[0] &&
            NavLinks.map((item, i) => {
              return item.hidden ? null : (
                <Link href={item.href} key={i}>
                  <a
                    className={item.href === route ? 'active' : ''}
                    onClick={this.handleSidebarClick}
                  >
                    <ListItem button>
                      {item.icon}
                      <ListItemText
                        disableTypography
                        className="text-white"
                        primary={item.text}
                      />
                    </ListItem>
                  </a>
                </Link>
              );
            })}
        </List>
      </div>
    );
  }
}

export default Sidebar;
