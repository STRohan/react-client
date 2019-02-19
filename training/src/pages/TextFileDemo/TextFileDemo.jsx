import React from 'react';
import TextField from '../../components/TextField/TextField';
import Slider from '../../components/Slider/Slider';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const bannersArray = [
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`];

const TextFileDemo = () => (
  <>
    <Slider banners={bannersArray} />
    <h3>This is Disabled Input</h3>
    <TextField disabled value="Disabled Input" />
    <h3>A Valid Input</h3>
    <TextField value="Accessible" />
    <h3>An Input with errors</h3>
    <TextField value="101" err="Could not be greater than" />
  </>
);
export default TextFileDemo;
