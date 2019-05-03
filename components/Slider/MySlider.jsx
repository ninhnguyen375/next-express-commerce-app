import Slider from 'react-animated-slider';

import React, { Component } from 'react';
import { Button } from '@material-ui/core';

const content = [
  {
    image: '/static/image/banner_iphone_large.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'Wellcome To Shopphone',
    button: 'Buy now'
  },
  {
    image: '/static/image/banner_iphone_large.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'Wellcome To Shopphone',
    button: 'Buy now'
  },
  {
    image: '/static/image/banner_iphone_large.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'Wellcome To Shopphone',
    button: 'Buy now'
  }
];
export class MySlider extends Component {
  render() {
    return (
      <>
        <Slider autoplay={3000} touchDisabled={true}>
          {content.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item.image}') no-repeat`,
                backgroundSize: 'cover'
              }}
            >
              <div className="center">
                <h1 style={{ color: 'white', textShadow: '0 0 5px black' }}>
                  {item.title}
                </h1>
                <p
                  style={{
                    maxWidth: '600px',
                    wordWrap: 'break-word',
                    margin: 'auto',
                    color: 'white',
                    textShadow: '0 0 5px black'
                  }}
                >
                  {item.description}
                </p>
                <a href="#content">
                  <Button
                    style={{
                      marginTop: 20,
                      borderRadius: '9999px',
                      padding: '10px 20px',
                      boxShadow: '0 0 5px black'
                    }}
                    variant="contained"
                    color="primary"
                  >
                    {item.button}
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </>
    );
  }
}

export default MySlider;
