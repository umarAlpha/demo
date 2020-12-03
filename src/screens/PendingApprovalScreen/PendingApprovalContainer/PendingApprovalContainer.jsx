import React, { Component } from 'react';
import './PendingApprovalContainer.css';

import MyTicketItem from '../../../components/MyTicketItem/MyTicketItem';
import PendingItem from '../../../components/TicketItem/TicketItem';
import PendingModal from '../PendingApprovalModal/PendingApprovalModal';

class PendingApprovalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      open: false,
      nextApproval: null,
      prevApproval: null,
      nextApprovalTitle: '',
      nextApprovalState: false,
    };
  }

  componentDidMount() {
    this.getNextApproval(this.props.id, false);
  }
  componentWillUnmount() {}

  componentDidUpdate(preProps, preState) {
    // if (preProps.parentTypeId !== this.props.parentTypeId) {
    //   this.setState({ open: false });
    // }
  }

  nextApprovalStateHandler = () => {
    this.setState({ nextApprovalState: true });
  };

  modalOpenHandler = () => {
    this.setState({ modalShow: true, open: true });
    this.getNextApproval(this.props.id, false);
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  getNextApproval = (approvalId, next) => {
    let getItem = this.props.data.find((item) => {
      return item.publicID === approvalId;
    });

    let index = this.props.data.indexOf(getItem);
    this.setState({ prevApproval: this.props.data[index] });

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.shortDescription : 'no more approvals';
      }

      if (!nextItem) {
        this.setState({ nextApprovalTitle: 'no more approvals' });
      } else {
        this.setState(
          {
            nextApproval: nextItem,
            nextApprovalTitle: next ? title : nextItem.shortDescription,
          },
          () => {
            console.log('nextttt', this.state.nextApprovalTitle);
          }
        );
      }
    }
  };

  render() {
    const { location } = this.props;
    return (
      <>
        {location === 'approvalScreen' && (
        <MyTicketItem
          {...this.props}
          handlerFunction={this.modalOpenHandler}
          className='py-2'
          thirdlist
        />
      )}
      {location === 'Dashboard' && (
        <PendingItem
            key={this.props.id}
            id={this.props.id}
            issuename={this.props.issuename}
            status={this.props.status}
            onClick={this.modalOpenHandler}
          />
      )}

        <PendingModal
          show={this.state.modalShow}
          onHide={this.modalCloseHandler}
          details={this.props.issueName}
          {...this.props}
          open={this.state.open}
          prevApproval={this.state.prevApproval}
          nextApproval={this.state.nextApproval}
          nextApprovalTitle={this.state.nextApprovalTitle}
          nextApprovalState={this.state.nextApprovalState}
          nextApprovalStateHandler={this.nextApprovalStateHandler}
          getNextApproval={this.getNextApproval}
        />
      </>
    );
  }
}
export default PendingApprovalContainer;
