import React from 'react';
import './SearchButton.css';

import { Button } from 'react-bootstrap';

const SearchButton = (props) => {
  return (
    <Button className='searchButton mt-3' {...props}>
      {props.children}
    </Button>
  );
};

export default SearchButton;
