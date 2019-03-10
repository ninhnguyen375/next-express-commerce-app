import Slider from 'react-animated-slider';

import React, { Component } from 'react';
import { Button } from '@material-ui/core';

const content = [
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'By now'
  },
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'By now'
  },
  {
    image: '/static/public/img/picsum1.jpeg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed cum eum exercitationem, aliquam vero iste? Minus sapiente officia animi amet ex maxime alias tempora est autem quia, illo iure nesciunt?',
    title: 'This is banner',
    button: 'By now'
  }
];
export class MySlider extends Component {
  render() {
    return (
      <>
        <style jsx global>{`
          .center {
            text-align: center;
            margin-top: 100px;
          }
          .slider {
            position: relative;
            width: 100%;
            height: 90vh;
            overflow: hidden;
          }

          .slider a.previousButton,
          .slider a.nextButton {
            font-size: 22px;
            line-height: 0;
            display: block;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            -webkit-transition: all 0.3s linear;
            transition: all 0.3s linear;
            z-index: 1;
            color: #333;
            padding: 10px;
            text-decoration: none;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            /* prevent jump effect when scaling */
          }

          .slider a.previousButton:not(.disabled):hover,
          .slider a.nextButton:not(.disabled):hover {
            -webkit-transform: translateY(-50%) scale(1.25);
            transform: translateY(-50%) scale(1.25);
            cursor: pointer;
          }

          .slider a.previousButton {
            left: 20px;
          }

          .slider a.nextButton {
            right: 20px;
          }

          .slide {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
          }

          .slide.hidden {
            visibility: hidden;
          }

          .slide.previous {
            left: -100%;
          }

          .slide.current {
            left: 0;
          }

          .slide.next {
            left: 100%;
          }

          .slide.animateIn,
          .slide.animateOut {
            -webkit-transition: all 2s ease;
            transition: all 2s ease;
          }

          .slide.animateIn.previous,
          .slide.animateIn.next {
            left: 0;
            visibility: visible;
          }

          .slide.animateOut.previous {
            left: 100%;
          }

          .slide.animateOut.next {
            left: -100%;
          }
        `}</style>
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
