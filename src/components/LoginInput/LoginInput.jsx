import React from 'react';
import './LoginInput.css';

import { Form } from 'react-bootstrap';

const LoginInput = (props) => {
  return <Form.Control {...props} className='login__input' />;
};

export default LoginInput;
