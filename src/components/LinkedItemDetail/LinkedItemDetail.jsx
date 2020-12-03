import React from 'react';
import './LinkedItemDetail.css';

const LinkedItemDetail = (props) => {
  return (
    <ul className='d-flex mb-4' style={{ listStyle: 'none' }}>
      <li className='linked__item'>
        <span className='d-inline-block font-weight-bold'>{props.label}:</span>
        <span className='d-inline-block text-primary ml-1'>{props.value}</span>
      </li>
    </ul>
  );
};

export default LinkedItemDetail;
