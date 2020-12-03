import React, { useState, useEffect } from 'react';
import './ProDropdown.css';

import classnames from 'classnames';

import Dropdown from 'react-bootstrap/Dropdown';

const ProDropdown = (props) => {
  console.log(props.defaultvalue);
  const [title, setTitle] = useState(props.defaultvalue);

  useEffect(() => {
    setTitle(props.defaultvalue);
  }, [props.defaultvalue]);

  const selectedValue = (val) => {
    setTitle(val);
    props.globalFilterValue(val);
  };

  return (
    <Dropdown className={classnames('csdropdown', props.className)}>
      <Dropdown.Toggle variant='pe'>
        <span className={classnames('d-inline-block text-dark', props.titleStyle)}>{title && title === 'Closed and Resolved' ? title.substr(0, 10) + '...': title}</span>
      </Dropdown.Toggle>
      
      {props.dropdownItems &&
      <Dropdown.Menu>    
          {props.dropdownItems && props.dropdownItems.map((item) => (
            <Dropdown.Item
              onClick={() => selectedValue(item.value)}
              key={item.id}
            >
              {item.value}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
      }
    </Dropdown>
  );
};

export default ProDropdown;
