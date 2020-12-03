import React, { Component } from 'react';
import './CommentForm.css';

import { MdSend } from 'react-icons/md';
import { Form } from 'react-bootstrap';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillMount() {}

  commentPost = (event) => {
    event.preventDefault();
    this.props.postComment(this.state.comment);
    this.setState({ comment: '' });
  };

  pressHandler = (e) => {
    if (e.key === 'Enter') {
      this.props.postComment(this.state.comment);
      this.setState({ comment: '' });
    }
  };

  render() {
    return (
      <div className='d-flex align-items-center justify-content-between pt-4'>
        <Form.Control
          name='comment'
          placeholder='Write Comment'
          type='text'
          className='comment-input'
          value={this.state.comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
          onKeyPressCapture={this.pressHandler}
        />
        <div className='ml-3 send-btn' onClick={this.commentPost}>
          <MdSend size={24} color='#16344e' />
        </div>
      </div>
    );
  }
}

export default CommentForm;
