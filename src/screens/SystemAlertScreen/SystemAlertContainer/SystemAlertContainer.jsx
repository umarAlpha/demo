import React, { Component } from 'react';

import Accordion2 from '../../../components/Accordion2/Accordion2';
import SystemAlertModal from '../SystemAlertModal/SystemAlertModal';

class SystemAlertContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      nextAlert: null,
      prevAlert: null,
      nextAlertTitle: '',
      nextAlertState: false,
    };
  }

  componentDidMount() {
    console.log('thisssss', this.props.id);
    this.getNextAlert(this.props.id, false);
  }

  getNextAlert = (alertId, next) => {
    console.log('HAHAHAHHA', alertId);
    let getItem = this.props.data.find((item) => {
      return item.id === alertId;
    });
    console.log('itemmm', getItem);
    let index = this.props.data.indexOf(getItem);
    this.setState({ prevAlert: this.props.data[index] });
    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.shortDescription : 'no more system alerts';
      }
      if (!nextItem) {
        this.setState({ nextAlertTitle: 'no more system alerts' });
      } else {
        this.setState(
          {
            nextAlert: nextItem,
            nextAlertTitle: next ? title : nextItem.shortDescription,
          },
          () => {
            console.log('nextttt', this.state.nextAlertTitle);
          }
        );
      }
      console.log('nextttt', this.state.nextAlertTitle);
    }
  };

  nextAlertStateHandler = (state) => {
    this.setState({ nextAlertState: state });
  };

  modalOpenHanlder = () => {
    this.setState({ modalShow: true });
    this.getNextAlert(this.props.id);
  };

  modalCloseHanlder = () => {
    if (this.props.openalertmodal) {
      this.props.closemodal(false);
    }
    this.setState({ modalShow: false });
  };

  render() {

    const { nextAlert, prevAlert, nextAlertTitle, nextAlertState } = this.state;

    return (
      <>
        <Accordion2
          title={this.props.shortDescription}
          description={this.props.description}
          modalOpenHandler={this.modalOpenHanlder}
        />
        <SystemAlertModal
          show={this.props.openalertmodal ? true : this.state.modalShow}
          onHide={this.modalCloseHanlder}
          nextAlert={nextAlert}
          prevAlert={prevAlert}
          nextAlertTitle={nextAlertTitle}
          nextAlertState={nextAlertState}
          nextAlertStateHandler={this.nextAlertStateHandler}
          getNextAlert={this.getNextAlert}
          {...this.props}
        />
      </>
    );
  }
}

export default SystemAlertContainer;
