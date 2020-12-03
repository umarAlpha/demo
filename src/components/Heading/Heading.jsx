import React from 'react';
import './Heading.css';

const Heading = (props) => {
  return (
    <div className='heading'>
      <h2 className='heading__one'>{props.textOne}</h2>
      <h1 className='heading__two'>{props.textTwo}</h1>
    </div>
  );
};

export default Heading;
