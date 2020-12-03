import React from 'react';
import './CustomInput.css';

import classnames from 'classnames';
import Dropdown from '../ProDropdown/ProDropdown';
import { FaSearch, FaTimes } from 'react-icons/fa';


const CustomInput = (props) => {
  return (
    <div className={classnames('d-flex align-items-center w-100 csinput-container', props.container)}>
      {props.dropdown && (
        <Dropdown
          globalFilterValue={props.globalFilterValue}
          defaultvalue={props.defaultvalue}
          className='dropdown-cs'
        />
      )}
      <div className={classnames('csinput', props.className)}>
        <input
          {...props}
          className={classnames('csinput__item', props.inputStyle)}
        />
        {!props.show ? (
          <FaSearch
            size={24}
            color='#126eb7'
            style={{ cursor: 'pointer' }}
            onClick={props.searchIconHandler}
          />
        ) : (
          <FaTimes
            size={24}
            color='126eb7'
            style={{ cursor: 'pointer' }}
            onClick={props.closeCatalogDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
