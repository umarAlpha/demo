import React from 'react';
import './NavbarButton.css';

const NavbarButton = (props) => {
  return (
    <button className='openbtn' onClick={props.navbarHandler}>
      ☰
    </button>
  );
};

export default NavbarButton;
