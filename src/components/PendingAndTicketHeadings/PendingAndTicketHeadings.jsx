import React from 'react';
import './PendingAndTicketHeadings.css';
import classnames from 'classnames';

const PendingAndTicketHeadings = (props) => {
  return (
    <ul className='tp__heading'>
      <li className='tp__item tp__item--one'>Ticket No.</li>
      <li className='tp__item tp__item--two'>Details</li>
      <li className='tp__item tp__item--three'>Status</li>
      <li className='tp__item tp__item--four'>Assigned To</li>
      <li className='tp__item tp__item--five'>Date</li>
      {/* <li>Ticket No.</li> */}
    </ul>
  );
};

export default PendingAndTicketHeadings;
