import Slider from 'react-animated-slider';

import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import MySliderStyles from './MySlider.styles';

const content = [
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'Buy now'
  },
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'Buy now'
  },
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'Buy now'
  }
];
export class MySlider extends Component {
  render() {
    return (
      <>
        <MySliderStyles />

        <Slider autoplay={3000}>
          {content.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item.image}') no-repeat`,
                backgroundSize: 'cover'
              }}
            >
              <div className="center">
                <h1 style={{ color: 'gray' }}>{item.title}</h1>
                <p
                  style={{
                    maxWidth: '600px',
                    wordWrap: 'break-word',
                    margin: 'auto',
                    color: 'gray'
                  }}
                >
                  {item.description}
                </p>
                <a href="#content">
                  <Button
                    style={{
                      marginTop: 20,
                      borderRadius: '9999px',
                      boxShadow: '0 0 20px blue',
                      padding: '10px 20px'
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
