import React from 'react';
import './RatingItem.css';

import Stars from '../RatingStars/RatingStarts';

const RatingItem = (props) => {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <p className='mb-0 rating__para'>{props.title}</p>
      <Stars {...props} />
    </div>
  );
};

export default RatingItem;
