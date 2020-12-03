import React from 'react';
import './AttachmentImages.css';

import { Spinner } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const AttachmentImages = (props) => {
  return (
    <>
      {props.show ? (
        <div className='attachment-images1'>
          {props.attachments.length > 0 &&
            props.attachments.map((img) => (
              <div
                className='position-relative main-attach-div d-inline-block m-2'
                key={img.id}
              >
                <img
                  alt={img.name}
                  src={img.src}
                  width='50px'
                  height='40px'
                  style={{ borderRadius: '6px' }}
                />
                <FaTimes
                  className='delete-attachment'
                  onClick={() => props.removeAttachments(img.id)}
                  color='#FF0000'
                />
              </div>
            ))}
        </div>
      ) : (
        <div className='attachment-images'>
          {props.attachstate ? (
            <div className='w-100'>
              <Spinner animation='border' size='md' variant='danger' />
            </div>
          ) : (
            <>
              {props.attachments.length <= 0 ||
              props.attachments.length === undefined ? (
                <p style={{ color: '#0B416D' }}>No Attachments Found!</p>
              ) : (
                props.attachments.map((img) => (
                  <div
                    className='position-relative main-attach-div d-inline-block m-2'
                    key={img.id}
                  >
                    <img
                      alt={img.name}
                      src={img.src}
                      width='50px'
                      height='40px'
                      style={{ borderRadius: '6px' }}
                    />
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AttachmentImages;
