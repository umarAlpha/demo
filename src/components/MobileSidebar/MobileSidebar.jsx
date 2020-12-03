import React from 'react';
import './MobileSidebar.css';
import ReactDom from 'react-dom';

const MobileSidebar = (props) => {
  return ReactDom.createPortal(
    <div className='mobile-sidebar'>{props.children}</div>,
    document.getElementById('mobile-sidebar')
  );
};

export default MobileSidebar;
