import React, { Component } from 'react';

import Accordion2 from '../../../components/Accordion2/Accordion2';
import AnnouncementModal from '../AnnouncementModal/AnnouncementModal';
import TickerItem from "../../../components/TickerItem/TickerItem";

class AnnouncementItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      nextAnnouncement: null,
      prevAnnouncement: null,
      nextAnnouncementTitle: "",
      nextAnnouncementState: false,
    };
  }

  componentDidMount() {
    this.getNextAnnouncement(this.props.publicID, false);
  }

  getNextAnnouncement = (announcementId, next) => {
    let getItem = this.props.data.find((item) => {
      return item.publicID === announcementId;
    });

    let index = this.props.data.indexOf(getItem);
    this.setState({ prevAnnouncement: this.props.data[index] });

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.subject : "no more announcement";
      }

      if (!nextItem) {
        this.setState({ nextAnnouncementTitle: "no more announcement" });
        title = nextItem2 ? nextItem2.subject : "no more announcements";
      }

      if (!nextItem) {
        this.setState({ nextAnnouncementTitle: "no more announcements" });
      } else {
        this.setState(
          {
            nextAnnouncement: nextItem,
            nextAnnouncementTitle: next ? title : nextItem.subject,
          },
          () => {
            console.log("nextttt", this.state.nextAnnouncementTitle);
          }
        );
      }
    }
  };

  nextAnnouncementStateHandler = () => {
    this.setState({ nextAnnouncementState: true });
  };

  modalOpenHanlder = () => {
    this.setState({ modalShow: true });
    this.getNextAnnouncement(this.props.publicID, false);
  };

  modalCloseHanlder = () => {
    if (this.props.openalertmodal) {
      this.props.closemodal(false);
    }
    this.setState({ modalShow: false, nextAnnouncementState: false });
  };

  render() {
    const { location } = this.props;
    return (
      <>
        {location === "announcements" && (
          <Accordion2
            title={this.props.shortDescription}
            description={this.props.description}
            modalOpenHandler={this.modalOpenHanlder}
          />
        )}

        {location === "dashboard" && (
          <TickerItem
            key={this.props.publicID}
            publicID={this.props.publicID}
            pathname={this.props.pathname}
            item={{ shortDescription: this.props.subject }}
            {...this.props}
            modalOpenHandler={this.modalOpenHanlder}
          />
        )}

        <AnnouncementModal
          show={this.props.openalertmodal ? true : this.state.modalShow}
          onHide={this.modalCloseHanlder}
          {...this.props}
          prevAnnouncement={this.state.prevAnnouncement}
          nextAnnouncement={this.state.nextAnnouncement}
          nextAnnouncementTitle={this.state.nextAnnouncementTitle}
          nextAnnouncementState={this.state.nextAnnouncementState}
          nextAnnouncementStateHandler={this.nextAnnouncementStateHandler}
          getNextAnnouncement={this.getNextAnnouncement}
        />
      </>
    );
  }
}

export default AnnouncementItem;
