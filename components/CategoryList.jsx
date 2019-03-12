import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import Link from 'next/link';

class CategoryList extends React.Component {
  state = {
    anchorEl: null,
    categories: []
  };
  async componentDidMount() {
    const categories = await Axios.get('/api/producers');
    if (!categories.data.err) {
      this.setState({ ...this.state, categories: categories.data.data });
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    if (this.props.onMobileMenuClose) this.props.onMobileMenuClose();
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          color="secondary"
          variant="contained"
          style={{ marginRight: 5 }}
          onClick={this.handleClick}
        >
          Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.state.categories &&
            this.state.categories.map(item => (
              <div onClick={this.handleClose} key={item._id}>
                <Link href={`/?category=${item.producer_id}`}>
                  <a>
                    <MenuItem>{item.producer_name}</MenuItem>
                  </a>
                </Link>
              </div>
            ))}
        </Menu>
      </>
    );
  }
}

export default CategoryList;
