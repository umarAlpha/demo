import React from 'react';
import './HeaderDropdown.css';

import { Images } from '../../assets/Assets';

import { Dropdown, Image } from 'react-bootstrap';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';

import { getImage } from '../../Utility/CommonMethods';

const HeaderDropdown = (props) => {
  const imageUrl = getImage(props.userInformation.userAvatar);
  return (
    <Dropdown className='dropdown-container'>
      <Dropdown.Toggle as='div' id='dropdown-basic' className='pr-2'>
        {props.userInformation ? (
          <>
            <Image
              src={
                !imageUrl.includes('no avatar on record')
                  ? imageUrl
                  : Images.imgPlaceholder
              }
              alt='avatar'
              roundedCircle
              className='dropdown-img'
            />
            <span className='name px-2 d-xs-none d-md-inline-block'>
              {props.userInformation.userName !== null
                ? props.userInformation.userName
                : 'sigmaGo'}
            </span>
          </>
        ) : (
          <span className='name px-2 d-xs-none d-md-inline-block'>
            User Information is Not getting....
          </span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className='dr-menu'>
        <Dropdown.Item className='dr-item' onClick={props.profileRouteHandler}>
          <div>
            <FaUserEdit />
            <span className='pl-2'>Profile</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item onClick={props.logoutHandler} className='dr-item'>
          <div className='d-flex align-items-center '>
            <FaSignOutAlt />
            <span className='pl-2'>logout</span>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderDropdown;
