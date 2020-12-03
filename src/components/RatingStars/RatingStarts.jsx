import React from 'react';
import './RatingStars.css';

import Stars from 'react-rating-stars-component';

const RatingStarts = (props) => {
  return (
    <Stars
      count={5}
      activeColor='#fdcb1f'
      size={32}
      onChange={(val) => props.onChange(val)}
      classNames='r-star'
    />
  );
};

export default RatingStarts;
