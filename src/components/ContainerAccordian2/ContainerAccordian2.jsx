import React, { Component } from 'react';

import Accordion2 from '../Accordion2/Accordion2';
import SystemAlertModal from '../SystemAlertModal/SystemAlertModal';

class ContainerAccordian2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  componentDidMount() {}

  modalOpenHanlder = () => {
    this.setState({ modalShow: true });
  };

  modalCloseHanlder = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <>
        <Accordion2 {...this.props} onClick={this.modalOpenHanlder} />
        <SystemAlertModal
          show={this.state.modalShow}
          onHide={this.modalCloseHanlder}
          title={this.props.title}
        />
      </>
    );
  }
}

export default ContainerAccordian2;
