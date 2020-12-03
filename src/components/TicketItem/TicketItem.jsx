import React from 'react';
import './TicketItem.css';

import classnames from 'classnames';

const TicketItem = (props) => {
  return (
    <ul className={classnames('ticket1')} onClick={props.onClick}>
      {props.id && <li className={classnames('ticket__item1 font-weight-bold')}>{props.id}</li>}
      <li
        className={classnames(
          'ticket__item1 ticket__item1--one text-left pl-3'
        )}
      >
        {props.issuename ? props.issuename : 'Short Description Not Found'}
      </li>
      {props.status && (
        <li
          className={classnames('statusStyle1', {
            'pending-color1': props.status === 'Pending',
            'resolved-color1': props.status === 'Resolved',
            'new-color1': props.status === 'New',
            'close-color1': props.status === 'Closed',
            'assigned-color1': props.status === 'Assigned',
            'in-progress1': props.status === 'In Progress',
            'waiting-color1': props.status === 'Waiting',
            'bg-color-reopened': props.status === 'Reopened'
          })}
        >
          {props.status}
        </li>
      )}
    </ul>
  );
};

export default TicketItem;
