import React, { Component } from 'react';
import './IncidentItem.css';

import Accordion from '../../../components/CustomAccordion/CustomAccordion';


// context api
import UserConsumer from '../../../ContextApi/UserInfoContext/context';

class IncidentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      rerender: false,
    };
  }

  componentDidMount() {
    console.log('This props', this.props);
  }

  componentDidUpdate(preProps, preState) {}
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
            <Accordion
              modalOpenHandler={this.props.modalOpenHandler}
              id={this.props.publicid}
              titleStyle='text-text-color'
              title={this.props.issuename}
              description={this.props.issuedesc}
              paragraphStyle='paragraph'
            />
            {/* <TicketModal
              show={this.state.modalShow}
              onHide={this.modalCloseHandler}
              rerender={this.state.rerender}
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
              // refreshList={this.props.refreshList}
            /> */}
          </>
        )}
      </UserConsumer.Consumer>
    );
  }
}

export default IncidentItem;
