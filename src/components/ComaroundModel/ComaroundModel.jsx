import React, { Component } from 'react';
import './ComaroundModel.css';

import { Modal } from 'react-bootstrap';
import { AiTwotoneLike } from 'react-icons/ai';

class ComaroundModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Modal
        {...this.props}
        size='xl'
        aria-labelledby='contained-modal-comaround-vcenter'
        className='cmodal'
        centered
        scrollable={false}
      >
        <Modal.Header className='cmodal-header' closeButton>
          <Modal.Title className='cmodel-title'>{this.props.title}</Modal.Title>
        </Modal.Header>
        <img
          src={require('../../assets/images/modalpic.png')}
          alt='modal'
          className='img-fluid cmodal-pic'
        />
        <Modal.Body className='cmodel-content cmodal-body'>
          <div className='d-flex align-items-center c-icons'>
            <div>
              <AiTwotoneLike color='#126eb7' size={22} />
              <span className='d-inline-block ml-1 font-weight-bold'>
                {this.props.solutionRatio}
              </span>
            </div>
            <div className='ml-3'>
              <img
                src={require('../../assets/images/eye.png')}
                alt='eye'
                className='d-inline-block img-fluid eye'
              />
              <span className='d-inline-block ml-1 font-weight-bold'>
                {this.props.relevence}
              </span>
            </div>
            {/* {this.props.knowledgeState && (
              <div className='ml-3'>
                <span
                  className={`d-inline-block ml-1 ${
                    this.props.knowledgeState === 'published'
                      ? 'published'
                      : 'appproved'
                  }`}
                >
                  {this.props.knowledgeState}
                </span>
              </div>
            )} */}
          </div>

          {/* <div className='h-100 mt-3 mx-1 com-container'>
            <div className='com-container__box'></div>
            <div className='com-container__buttons p-1'>
              <div className='com-container__buttons__one'>
                <span className='d-inline-block font-weight-bold'>
                  What you want tell?
                </span>
                <span className='d-inline-block bg-primary'>Hello</span>
              </div>
              <div className='com-container__buttons__two'>Two</div>
            </div>
          </div> */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ComaroundModel;
