import React from 'react';
import '../App.css';

const Box = ({ id ,index}) => {
  return <div class="flex-item" id={id}>{index}</div>;
};

export default Box;
