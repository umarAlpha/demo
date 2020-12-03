import React from 'react';
import './NavItem.css';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
  return (
    <li className='csnav__item'>
      <NavLink
        to={props.to}
        exact
        activeClassName='csnav__selected'
        className='csnav__link'
      >
        {props.children}
        <span>{props.linkName}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
