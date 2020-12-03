import React from 'react';
import './SuccessModal.css';

import classnames from 'classnames';

import { Modal } from 'react-bootstrap';
import { TiTick, TiTimes } from 'react-icons/ti';

const SuccessModal = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-success-vcenter'
      className='succmodal'
      centered
      scrollable={false}
    >
      <Modal.Body className={classnames('succmodal-body', props.bodyColor)}>
        <img
          src={require('../../assets/images/modalpic.png')}
          alt='modal'
          className='img-fluid succmodal-pic'
        />
        <div className={classnames('p-5 text-center succ-anim')}>
          <h2 className='font-weight-bold'>{props.title}</h2>
          <div className='modal-icon' onClick={props.iconhandler}>
            {props.falseIcon ? (
              <TiTimes size={90} color='#d10d0d' />
            ) : (
              <TiTick size={90} color='#126eb7' />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
