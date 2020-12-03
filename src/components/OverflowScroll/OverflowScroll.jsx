import React from 'react';
import './OverflowScroll.css';

const OverflowScroll = (props) => {
  return <div className='overflow'>{props.children}</div>;
};

export default OverflowScroll;
