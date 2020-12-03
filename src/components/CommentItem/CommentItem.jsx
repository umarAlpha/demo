import React from 'react';
import './CommentItem.css';

import { getImage } from '../../Utility/CommonMethods';

const CommentItem = (props) => {
  return (
    <div className='d-flex align-items-start comment'>
      {props.avatar && (
        <img
          src={
            localStorage.getItem('userInfoComment')
              ? getImage(props.avatar && props.avatar)
              : require('../../assets/images/log.png')
          }
          alt='avatar'
          className='img-fluid comment__img mr-1'
        />
      )}
      <div className='comment-item'>
        <span className='comment__name'>{props.createdByName}</span>
        <span className='comment__desc'>{props.details}</span>
      </div>
      <div className='comment__date'>{props.createdByDate}</div>
    </div>
  );
};

export default CommentItem;
