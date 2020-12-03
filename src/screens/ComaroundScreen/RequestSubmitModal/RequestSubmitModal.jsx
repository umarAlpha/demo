import React, { Component } from 'react';
import './RequestSubmitModal.css';

import { Modal, Button, Form } from 'react-bootstrap';

class RequestSubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      title: '',
      feedback: '',
      reasonVal: '',

      emailError: false,
      titleError: false,
      feedbackError: false,
      reasonValError: false,
    };
  }

  componentDidMount() {}

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitReason = (e) => {
    e.preventDefault();
    const { email, title, reasonVal, feedback } = this.state;

    let validEmailRegex = RegExp(
      '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i'
    );

    if (!reasonVal) {
      return this.setState({reasonValError: true})
    }
    if (validEmailRegex.test(email)) {
      return this.setState({ emailError: true });
    }
    if (!title) {
      return this.setState({ titleError: true });
    }
    if (!feedback) {
      return this.setState({feedbackError: true});
    }
    this.props.submitformvalues({ email, title, reasonVal, feedback });
    this.setState({ email: '', title: '', reasonVal: '', feedback: '' });
  };

  render() {
    const {
      email,
      feedback,
      title,
      reasonVal,
      reasonValError,
      emailError,
      titleError,
      feedbackError,
    } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header className='border-0' closeButton>
          <Modal.Title>The article didn’t help me because.</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitReason}>
          <Modal.Body>
            <div>
              <Form.Group>
                <Form.Control
                  name='reasonVal'
                  as='select'
                  className='bor-5 request__input'
                  onChange={this.inputHandler}
                  value={reasonVal}
                >
                  <option value=''>Plese choose your reason</option>
                  <option value='The content does not give an expected result'>
                    The content does not give an expected result
                  </option>
                  <option value='I dont understand the content'>
                    I don't understand the content
                  </option>
                  <option value='Information is missing'>
                    Information is missing
                  </option>
                </Form.Control>
                {reasonValError && (
                  <div className='text-danger'>Please Select Reason</div>
                )}
                <br />
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='Email'
                  className='bor-5 request__input'
                  value={email}
                  onChange={this.inputHandler}
                />
                {emailError && (
                  <div className='text-danger'>Enter Valid Email</div>
                )}
                <br />
                <Form.Control
                  name='title'
                  type='text'
                  placeholder='Title'
                  className='bor-5 request__input'
                  onChange={this.inputHandler}
                  value={title}
                />
                {titleError && (
                  <div className='text-danger'>Pleae enter title</div>
                )}
                <br />
                <Form.Control
                  name='feedback'
                  as='textarea'
                  placeholder='Feedback'
                  rows='5'
                  className='bor-5 request__input'
                  onChange={this.inputHandler}
                  value={feedback}
                />
                {feedbackError && (
                  <div className='text-danger'>Enter Feedback</div>
                )}
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer className='border-0'>
            <Button
              variant='danger'
              size='sm'
              className='bor-5'
              onClick={this.props.handleClose}
            >
              Cancel
            </Button>
            <Button type='submit' variant='primary' size='sm' className='bor-5'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default RequestSubmitModal;
