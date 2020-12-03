import React from 'react';
import './Footer.css';

import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

import FooterItem from './FooterItem/FooterItem';

const list = [
  {
    id: 1,
    name: 'Energy Corridor, 11111',
    second: ' Katy Freeway, Suite #910 Houston, Texas 77079',
    icon: <FaMapMarkerAlt size={22} style={{ marginRight: '8px' }} />,
  },
  {
    id: 2,
    name: '888-9-sigmaGO (888-974-4624)',
    icon: <FaPhoneAlt size={22} style={{ marginRight: '8px' }} />,
  },
  {
    id: 3,
    name: 'gomobile@sigmago.app',
    icon: <IoMdMail size={24} style={{ marginRight: '8px' }} />,
  },
];

const Footer = (props) => {
  return (
    <footer className='footer'>
      {list.map((item) => (
        <FooterItem key={item.id} second={item.second}>
          {item.icon}
          {item.name}
        </FooterItem>
      ))}
    </footer>
  );
};

export default Footer;
