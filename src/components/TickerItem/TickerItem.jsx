

import React, { useState } from 'react';
import './TickerItem.css';
import TickerLogo from '../../assets/images/app_logo_dark.png';

import AnnouncementModal from '../../screens/AnnouncementScreen/AnnouncementModal/AnnouncementModal';

const TickerItem = ({ pathname, item, ...rest }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className='header__move--item' onClick={() => setOpenModal(true)}>
        <div className='header__move--link'>
          <img
            src={TickerLogo}
            alt='ticker_logo'
            className='ticker__logo img-fluid mr-2'
          />
          {item.shortDescription}
        </div>
      </div>
      <AnnouncementModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        {...rest}
      />
    </>
  );
};
export default TickerItem;