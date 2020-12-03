import React, { Component } from 'react';

import ComaroundModal from '../../screens/ComaroundScreen/ComaroundModal/ComaroundModal';
import Accordian from '../../components/Accordion2/Accordion2';

class HelpfulArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <div className='border-bottom mb-3'>
        <Accordian {...this.props} modalOpenHandler={this.modalShowHandler} />
        <ComaroundModal
          show={this.state.modalShow}
          onHide={this.modalCloseHandler}
          {...this.props}
        />
      </div>
    );
  }
}
export default HelpfulArticleContainer;
