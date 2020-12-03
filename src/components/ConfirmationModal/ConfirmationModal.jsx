import React from 'react';
import './ConfirmationModal.css';

import classnames from 'classnames';

import { Modal, Button, Spinner } from 'react-bootstrap';

const ConfirmationModal = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-success-vcenter'
      className='succmodal'
      centered
      scrollable={false}
      backdrop='static'
    >
      <Modal.Body
        className={classnames('confirmationmodal-body', props.bodyColor)}
      >

        {props.loading ? (
          <div className='text-center h-25'>
            <p>Please Wait Ticket Creating...</p>
            <Spinner size={26} animation='border' variant='primary' />
          </div>
        ) : (
          <div>
            <div className='text-center p-3'>
              <p className='confirmationmodal__heading'>{props.title}</p>
            </div>
            <div className='d-flex justify-content-center align-items-center px-5'>
              <span className='d-inline-block mx-3'>
                <Button
                  variant='primary'
                  size='md'
                  onClick={props.createtickethandler}
                >
                  Yes
                </Button>
              </span>
              <span className='d-inline-block'>
                <Button
                  variant='outline-secondary'
                  size='md'
                  onClick={props.closehandler}
                >
                  No
                </Button>
              </span>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
