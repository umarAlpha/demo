import React from 'react';
import './FooterItem.css';

const FooterItem = (props) => {
  return (
    <div className='footer__item'>
      {props.children}
      {props.second}
    </div>
  );
};

export default FooterItem;
