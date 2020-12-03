import React from 'react';
import './AttachmentInput.css';

import { FaPlusSquare } from 'react-icons/fa';

const AttachmentInput = (props) => {
  return (
    <label className='attachment'>
      <FaPlusSquare size={32} color='#126eb7' className='attachment-icon' />
      <span>Attachments</span>
      <input
        type='file'
        accept='image/png, image/jpg, image/jpeg'
        onChange={(e) => props.pickImage(e)}
        className='attachment__input'
      />
    </label>
  );
};

export default AttachmentInput;
