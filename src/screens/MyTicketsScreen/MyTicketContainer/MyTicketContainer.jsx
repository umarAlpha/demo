import React, { Component } from 'react';
import './MyTicketContainer.css';

import MyTicketItem from '../../../components/MyTicketItem/MyTicketItem';
import TicketItem from '../../../components/TicketItem/TicketItem'
import TicketModal from '../TicketModal/TicketModal';
import IncidentItem from '../../SearchScreen/IncidentItem/IncidentItem'

// context api
import UserConsumer from '../../../ContextApi/UserInfoContext/context';

class MyTicketContainer extends Component {
  static contextType = UserConsumer;
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      rerender: false,
      nextTicket: null,
      prevTicket: null,
      nextTicketTitle: '',
      nextTicketState: false 
    };
  }

  componentDidMount() {
    this.getNextTicket(this.props.id, false);
    const { user } = this.context;
    this.userinfo = user;
  }

  componentDidUpdate(preProps, preState) {}
  componentWillUnmount() {}

  modalOpenHandler = () => {
    this.setState({ modalShow: true, rerender: true });
    this.getNextTicket(this.props.id, false)
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false, nextTicketState: false, rerender: false  });
  };

  getNextTicket = (ticketId, next) => {
    console.log('helllllllllll')
    let getItem = this.props.data.find((item) => {
      return item.publicID === ticketId;
    });


    let index = this.props.data.indexOf(getItem);
    this.setState({ prevTicket: this.props.data[index] });

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.description : 'no more tickets';
      }

      if (!nextItem) {
        this.setState({ nextTicketTitle: 'no more tickets' });
      } else {
        this.setState(
          {
            nextTicket: nextItem,
            nextTicketTitle: next ? title : nextItem.description,
          },
          () => {
            console.log('nextttt', this.state.nextTicketTitle);
          }
        );
      }
    }
  };

  nextTicketStateHandler = () => {
    this.setState({ nextTicketState: true });
  };

  render() {
    const { nextTicket, nextTicketTitle, prevTicket } = this.state;
    const { location } = this.props;
    return (
      <React.Fragment>
        {location === 'ticketScreen' && (
        <MyTicketItem
          {...this.props}
          handlerFunction={this.modalOpenHandler}
          className='py-2'
          fivethlist
        />
        )}

        {location === 'Dashboard' && (
          <TicketItem
            key={Math.random()}
            id={this.props.id}
            issuename={this.props.issuename}
            status={this.props.status}
            statusStyle='statusStyle'
            onClick={this.modalOpenHandler}
          />
        )}
        {location === 'search' && (
          <IncidentItem
            key={this.props.key}
            publicid={this.props.publicid}
            id={this.props.id}
            recid={this.props.recid}
            issuename={this.props.issuename}
            issuedesc={this.props.issuedesc}
            status={this.props.status}
            assignedto={this.props.assignedto}
            date={this.props.date}
            service={this.props.service}
            category={this.props}
            subcat={this.props.subcat}
            modalOpenHandler={this.modalOpenHandler}
          />
        )}
        <TicketModal
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
          withdraw={this.props.withdraw}
          userinfo={this.userinfo}
          refreshList={this.props.refreshList}
          prevTicket={prevTicket}
          nextTicket={nextTicket}
          nextTicketTitle={nextTicketTitle}
          nextTicketState={this.state.nextTicketState}
          nextTicketStateHandler={this.nextTicketStateHandler}
          getNextTicket={this.getNextTicket}
        />
      </React.Fragment>
    );
  }
}

export default MyTicketContainer;
