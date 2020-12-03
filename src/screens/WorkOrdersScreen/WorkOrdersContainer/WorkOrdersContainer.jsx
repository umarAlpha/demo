import React, { Component } from 'react';
import './WorkOrdersContainer.css';

import MyTicketItem from '../../../components/MyTicketItem/MyTicketItem';
import WorkOrdersModal from '../WorkOrdersModal/WorkOrdersModal';

// context api
import UserConsumer from '../../../ContextApi/UserInfoContext/context';

class WorkOrdersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      rerender: false,
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  modalOpenHandler = () => {
    this.setState({ modalShow: true, rerender: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <UserConsumer.Consumer>
        {(context) => (
          <>
            <MyTicketItem
              {...this.props}
              handlerFunction={this.modalOpenHandler}
              // className='bs'
              // itemStyle='ticket-item'
              // item1Style='ticket-item1'
              // item4Style='ticket-item4'
              // item5Style='ticket-item5'
              // statusStyle='status-style'
              // center
              // right
            />
            <WorkOrdersModal
              show={this.state.modalShow}
              onHide={this.modalCloseHandler}
              id={this.props.id}
              subject={this.props.issueName}
              assigned={this.props.assignedTo}
              status={this.props.status}
              description={this.props.issuedesc}
              recid={this.props.recid}
              service={this.props.service}
              category={this.props.category}
              subcat={this.props.subcat}
              userinfo={context}
              refreshList={this.props.refreshList}
              rerender={this.state.rerender}
            />
          </>
        )}
      </UserConsumer.Consumer>
    );
  }
}

export default WorkOrdersContainer;
