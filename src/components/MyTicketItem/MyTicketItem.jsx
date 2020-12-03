import React from 'react';
import './MyTicketItem.css';

import classnames from 'classnames';

const MyTicketItem = ({
  id,
  issuename,
  issuedesc,
  status,
  assignedto,
  date,
  type,
  primaryuser,
  assettype,
  location,
  handlerFunction,
  className,
  statusStyle,
  itemStyle,
  item1Style,
  center,
  item4Style,
  item5Style,
  right,
  secondList,
  thirdlist,
  fourthlist,
}) => {
  console.log('sta ==>> ', assettype);

  return (
    <>
      {secondList ? (
        <ul
          className={classnames('ticket', className)}
          onClick={handlerFunction}
        >
          {id && (
            <li
              className={classnames(
                'ticket__item ticket__item--id font-weight-bold',
                itemStyle
              )}
            >
              {id}
            </li>
          )}
          {status && (
            <li
              className={classnames(
                'ticket__button ticket__item--status',
                statusStyle,
                {
                  'pending-color': status === 'Pending',
                  'resolved-color': status === 'Resolved',
                  'new-color': status === 'New',
                  'close-color': status === 'Closed',
                  'bg-assigned': status === 'Assigned',
                  'in-progress': status === 'In Progress',
                  'waiting-color': status === 'Waiting',
                  'bg-color-reopened': status === 'Reopened',
                }
              )}
            >
              {status}
            </li>
          )}
          {(assignedto || !assignedto) && (
            <li
              className={classnames(
                'ticket__item ticket__item--name',
                item4Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {assignedto ? assignedto : 'UnAssigned'}
            </li>
          )}
          {(issuename || issuedesc) && (
            <li
              className={classnames(
                'ticket__item ticket__item--details',
                item1Style
              )}
            >
              <span className='ticket__item--one'>
                {issuename ? issuename : 'No Description Found'}
              </span>
              <span className='ticket__item--two'>
                {issuedesc && issuedesc.length > 40
                  ? issuedesc.substr(0, 40) + '...'
                  : issuedesc}
              </span>
            </li>
          )}
          {date && (
            <li
              className={classnames(
                'ticket__item ticket__item--date',
                item5Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {date}
            </li>
          )}
        </ul>
      ) : thirdlist ? (
        <ul
          className={classnames('ticket', className)}
          onClick={handlerFunction}
        >
          {id && (
            <li
              className={classnames(
                'ticket__item ticket__item--id font-weight-bold',
                itemStyle
              )}
            >
              {id}
            </li>
          )}
          {status && (
            <li
              className={classnames(
                'ticket__button ticket__item--status',
                statusStyle,
                {
                  'pending-color': status === 'Pending',
                  'resolved-color': status === 'Resolved',
                  'new-color': status === 'New',
                  'close-color': status === 'Closed',
                  'bg-assigned': status === 'Assigned',
                  'in-progress': status === 'In Progress',
                  'waiting-color': status === 'Waiting',
                  'bg-color-reopened': status === 'Reopened',
                }
              )}
            >
              {status}
            </li>
          )}
          {(assignedto || !assignedto) && (
            <li
              className={classnames(
                'ticket__item ticket__item--name2',
                item4Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {assignedto ? assignedto : 'UnAssigned'}
            </li>
          )}
          {(type || !type) && (
            <li
              className={classnames(
                'ticket__item ticket__item--type',
                item4Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {type ? type : 'No Type Found'}
            </li>
          )}
          <li
            className={classnames(
              'ticket__item ticket__item--details',
              item1Style
            )}
          >
            <span className='ticket__item--one'>
              {issuename ? issuename : 'No Description Found'}
            </span>
            <span className='ticket__item--two'>
              {issuedesc && issuedesc.length > 40
                ? issuedesc.substr(0, 40) + '...'
                : issuedesc}
            </span>
          </li>
          {date && (
            <li
              className={classnames(
                'ticket__item ticket__item--date',
                item5Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {date}
            </li>
          )}
        </ul>
      ) : fourthlist ? (
        <ul
          className={classnames('ticket-ci', className)}
          onClick={handlerFunction}
        >
          {id && (
            <li
              className={classnames(
                'ticket__item ticket__item--id2 font-weight-bold',
                itemStyle
              )}
            >
              {id}
            </li>
          )}
          {type && (
            <li
              className={classnames(
                'ticket__item ticket__item--citype'
              )}
            >
              <span>{type}</span>
            </li>
          )}
          {assettype && (
            <li
              className={classnames(
                'ticket__item ticket__item--assettype',
                statusStyle
              )}
            >
              {assettype}
            </li>
          )}
          {primaryuser && (
            <li
              className={classnames(
                'ticket__item ticket__item--assetuser',
                item4Style
              )}
            >
              {primaryuser ? primaryuser : 'No User Found'}
            </li>
          )}
          {location && (
            <li
              className={classnames(
                'ticket__item ticket__item--location',
                item5Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {location}
            </li>
          )}
        </ul>
      ) : (
        <ul
          className={classnames('ticket', className)}
          onClick={handlerFunction}
        >
          {id && (
            <li
              className={classnames(
                'ticket__item ticket__item--id font-weight-bold',
                itemStyle
              )}
            >
              {id}
            </li>
          )}
          <li
            className={classnames(
              'ticket__item ticket__item--details',
              item1Style
            )}
          >
            <span className='ticket__item--one'>{issuename}</span>
            <span className='ticket__item--two'>
              {issuedesc && issuedesc.length > 30
                ? issuedesc.substr(0, 30) + '...'
                : issuedesc}
            </span>
          </li>
          {status && (
            <li
              className={classnames(
                'ticket__button ticket__item--status',
                statusStyle,
                {
                  'pending-color': status === 'Pending',
                  'resolved-color': status === 'Resolved',
                  'new-color': status === 'New',
                  'close-color': status === 'Closed',
                  'bg-assigned': status === 'Assigned',
                  'in-progress': status === 'In Progress',
                  'waiting-color': status === 'Waiting',
                  'bg-color-reopened': status === 'Reopened',
                }
              )}
            >
              <span className='d-inline-block'>{status}</span>
            </li>
          )}
          {(assignedto || !assignedto) && (
            <li
              className={classnames(
                'ticket__item ticket__item--name',
                item4Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {assignedto ? assignedto : 'UnAssigned'}
            </li>
          )}
          {date && (
            <li
              className={classnames(
                'ticket__item ticket__item--date',
                item5Style,
                {
                  // 'text-center': center === true,
                  // 'text-center': right === true,
                }
              )}
            >
              {date}
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default MyTicketItem;
