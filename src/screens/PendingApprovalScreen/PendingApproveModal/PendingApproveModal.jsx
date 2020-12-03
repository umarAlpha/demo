import React, { Component } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

class PendingApproveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Approved',
      reason: '',
      reasonError: false,
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.reason === '') {
      return this.setState({ reasonError: true });
    }
    const { title, reason } = this.state;
    this.props.submitReason({ title, reason });
    this.setState({ reason: '', reasonError: false });
    this.props.onHide();
  };

  render() {
    return (
      <Modal
        {...this.props}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton className='border-0'>
          <Modal.Title>Approved</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}>
          <Modal.Body>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                name='reason'
                type='text'
                placeholder='Please type the reason here'
                value={this.state.reason}
                onChange={(e) => this.setState({ reason: e.target.value })}
              />
              {this.state.reasonError ? (
                <div className='text-danger'>Please fill the reason</div>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='new' size='sm' className='bor-5 text-uppercase'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default PendingApproveModal;
