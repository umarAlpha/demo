import React from 'react';
import './CustomCard.css';

import classnames from 'classnames';
import Card from 'react-bootstrap/Card';
import Dropdown from '../ProDropdown/ProDropdown';
import Input from '../CustomInput/CustomInput';
import Pagination from '../Pagination/Pagination';

import { MdRefresh } from 'react-icons/md';

const CustomCard = (props) => {
  return (
    <Card
      className={classnames('cscard', props.className)}
      onClick={props.onClick}
    >
      {props.title && (
        <Card.Title className='cscard__title'>
          <div className='d-flex align-items-center justify-content-between pr-1'>
            <span className='d-inline-block'>
              {props.title}
              {props.total >= 0 && (
                <span className='ml-2 d-inline-block text-text-color font-weight-bold'>
                  ({props.total})
                </span>
              )}
            </span>
            {props.refresh && (
              <span
                className='d-inline-block ml-2'
                onClick={props.refreshHandler}
                style={{ cursor: 'pointer' }}
              >
                <MdRefresh size={26} />
              </span>
            )}
          </div>
          <div className='d-flex align-items-center'>
            {props.button && (
              <button className='cscard__btn' onClick={props.navigationHandler}>
                See All
              </button>
            )}
            {props.dropdown && (
              <Dropdown
                globalFilterValue={props.globalFilterValue}
                dropdownItems={props.dropdownItems}
                defaultvalue={props.defaultvalue}
                className='bor-5 dropdown-filter'
              />
            )}
            {props.input && (
              <div className='w-100'>
                <Input
                  className='input'
                  inputStyle='input font14'
                  placeholder='Search'
                  onChange={props.onChange}
                  value={props.value}
                />
              </div>
            )}
          </div>
        </Card.Title>
      )}
      {props.children}
      {props.paginate && (
        <div className='text-right pt-3'>
          <Pagination
            pageCount={props.pageCount}
            handlePageClick={props.handlePageClick}
            forcepage={props.forcepage}
            initialpage={props.initialpage}
          />
        </div>
      )}
    </Card>
  );
};

export default CustomCard;
