import React from 'react';
import './TicketHeader.css';

const TicketHeader = (props) => {
  return (
    <>
      {props.secondlist ? (
        <ul
          className='d-flex align-items-center font-weight-bold ticket-header'
          style={{ listStyle: 'none' }}
        >
          <li className='ticket-header__item ticket-header__item--id'>
            {props.title}
          </li>
          <li className='ticket-header__item ticket-header__item--status'>
            {props.title3}
          </li>
          <li className='ticket-header__item ticket-header__item--name'>
            {props.title4}
          </li>
          <li className='ticket-header__item ticket-header__item--details'>
            {props.title2}
          </li>
          <li className='ticket-header__item ticket-header__item--date'>
            {props.title5}
          </li>
        </ul>
      ) : props.thirdlist ? (
        <ul
          className='d-flex align-items-center font-weight-bold ticket-header'
          style={{ listStyle: 'none' }}
        >
          <li className='ticket-header__item ticket-header__item--id'>
            {props.title}
          </li>
          <li className='ticket-header__item ticket-header__item--status'>
            {props.title3}
          </li>
          <li className='ticket-header__item ticket-header__item--name2'>
            {props.title4}
          </li>
          <li className='ticket-header__item ticket-header__item--type'>
            {props.title6}
          </li>
          <li className='ticket-header__item ticket-header__item--details'>
            {props.title2}
          </li>
          <li className='ticket-header__item ticket-header__item--date'>
            {props.title5}
          </li>
        </ul>
      ) : props.fourthlist ? (
        <ul
          className='d-flex align-items-center font-weight-bold ticket-header'
          style={{ listStyle: 'none' }}
        >
          <li className='ticket-header__item ticket-header__item--id2'>
            {props.title}
          </li>
          <li className='ticket-header__item ticket-header__item--citype'>
            {props.title2}
          </li>
          <li className='ticket-header__item ticket-header__item--assettype'>
            {props.title3}
          </li>
          <li className='ticket-header__item ticket-header__item--user'>
            {props.title4}
          </li>
          <li className='ticket-header__item ticket-header__item--location'>
            {props.title5}
          </li>
        </ul>
      ) : (
        <ul
          className='d-flex align-items-center font-weight-bold ticket-header'
          style={{ listStyle: 'none' }}
        >
          <li className='ticket-header__item ticket-header__item--id'>
            {props.title}
          </li>
          <li className='ticket-header__item ticket-header__item--details'>
            {props.title2}
          </li>
          <li className='ticket-header__item ticket-header__item--status'>
            {props.title3}
          </li>
          <li className='ticket-header__item ticket-header__item--name'>
            {props.title4}
          </li>
          <li className='ticket-header__item ticket-header__item--date'>
            {props.title5}
          </li>
        </ul>
      )}
    </>
  );
};

export default TicketHeader;
