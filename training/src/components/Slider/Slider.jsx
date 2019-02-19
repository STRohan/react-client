import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { imageStyle } from './style';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { random, banners } = this.props;
    const total = banners.length;
    this.interval = setInterval(() => {
      const { index } = this.state;
      const number = (random)
        ? getRandomNumber(total)
        : getNextRoundRobin(total, index);
      this.setState({ index: number });
    }, 2000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const { index } = this.state;
    const {
      altText,
      banners,
      defaultBanner,
      duration,
      height,
      random,
      justifyContent,
      ...rest
    } = this.props;
    const source = (banners.length) ? banners[index] : defaultBanner;
    return (
      <div style={imageStyle}>
        <img src={source} {...rest} alt={altText} height={height} />
      </div>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
  justifyContent: PropTypes.string,
};
Slider.defaultProps = {
  altText: 'Not Available',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
  justifyContent: 'center',

};
export default Slider;
