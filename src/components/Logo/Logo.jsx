import React from 'react';
import './Logo.css';

import { Images } from '../../assets/Assets';

import { Link } from 'react-router-dom';

// import LogoImage from '../../assets/images/homepagelogo.png';

export const Logo = (props) => {
  return (
    <div className='logo'>
      <Link to='/home'>
        <img
          src={Images.homeLogo}
          alt='home-logo'
          className='logo__img img-fluid'
        />
      </Link>
    </div>
  );
};
