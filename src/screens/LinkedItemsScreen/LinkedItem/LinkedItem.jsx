import React, { Component } from 'react';

import MyLinkedItem from '../../../components/MyTicketItem/MyTicketItem';
import LinkedItemModal from '../LinkedItemModal/LinkedItemModal';

class LinkedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      nextLinkedItem: null,
      prevLinkedItem: null,
      nextLinkedItemTitle: '',
      nextLinkedItemState: false
    };
  }

  componentDidMount() {
    this.getNextLinkedItem(this.props.id, false);
  }

  getNextLinkedItem = (linkedId, next) => {
    let getItem = this.props.data.find((item) => {
      return item.assetTag === linkedId;
    });


    let index = this.props.data.indexOf(getItem);
    this.setState({ prevLinkedItem: this.props.data[index] });

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.type : 'no more CI items';
      }

      if (!nextItem) {
        this.setState({ nextLinkedItemTitle: 'no more CI items' });
      } else {
        this.setState(
          {
            nextLinkedItem: nextItem,
            nextLinkedItemTitle: next ? title : nextItem.type,
          },
          () => {
            console.log('nextttt', this.state.nextLinkedItemTitle);
          }
        );
      }
    }
  };

  nextLinkedItemStateHandler = () => {
    this.setState({ nextLinkedItemState: true });
  };

  modalOpenHandler = () => {
    this.setState({ modalShow: true });
    this.getNextLinkedItem(this.props.id, false);
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false , nextLinkedItemState: false });
  };

  render() {
    return (
      <React.Fragment>
        <MyLinkedItem
          fourthlist
          className='py-3'
          id={this.props.id}
          primaryuser={this.props.primaryUser ? this.props.primaryUser : 'No User found'}
          location={this.props.location ? this.props.location : 'No Location Found'}
          type={this.props.type ? this.props.type : 'CI Type Not Found'}
          assettype={this.props.assetType ? this.props.assetType : 'No Type'}
          busobid={this.props.busobid}
          busobrecid={this.props.busobrecid}
          handlerFunction={this.modalOpenHandler}
        />
        <LinkedItemModal
          show={this.state.modalShow}
          onHide={this.modalCloseHandler}
          id={this.props.id}
          type={this.props.type}
          busobid={this.props.busobid}
          busobrecid={this.props.busobrecid}
          prevLinkedItem={this.state.prevLinkedItem}
          nextLinkedItem={this.state.nextLinkedItem}
          nextLinkedItemTitle={this.state.nextLinkedItemTitle}
          nextLinkedItemState={this.state.nextLinkedItemState}
          nextLinkedItemStateHandler={this.nextLinkedItemStateHandler}
          getNextLinkedItem={this.getNextLinkedItem}
        />
      </React.Fragment>
    );
  }
}

export default LinkedItem;
