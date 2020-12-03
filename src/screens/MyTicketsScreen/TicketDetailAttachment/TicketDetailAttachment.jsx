import React, { Component } from 'react';
import './TicketDetailAttachment.css';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Spinner } from 'react-bootstrap';

import classnames from 'classnames';

import ModalList from '../../../components/ModalList/ModalList';
import AttachmentInput from '../../../components/AttachmentInput/AttachmentInput';
// import AttachmentImages from '../../../components/AttachmentImages/AttachmentImages';

class TicketDetailAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  ImageComponent = ({ index, photo }) => {
    return (
      <img
        {...photo}
        width='80px'
        height='auto'
        style={{ borderRadius: '6px', cursor: 'pointer', marginLeft: '0.2rem' }}
        onClick={() => this.openLightbox({ index, photo })}
        alt='ticketimage'
      />
    );
  };

  openLightbox = ({ photo, index }) => {
    this.setState({ currentImage: index, viewerIsOpen: true });
  };

  closeLightbox = () => {
    this.setState({ currentImage: 0, viewerIsOpen: false });
  };

  selectAttachment = (e) => {
    let file = e.target.files[0];
    if (file === undefined) {
      console.log('null selected');
      return null;
    } else {
      let name = e.target.files[0].name;
      let blob = URL.createObjectURL(e.target.files[0]);
      this.props.uploadAttachments(file, name, blob);
    }
  };

  render() {
    return (
      <div className={classnames('', this.props.constyle)}>
        <ModalList
          status1={this.props.status}
          classification={{
            service: this.props.classification.service,
            category: this.props.classification.category,
            subcat: this.props.classification.subcat,
          }}
        />
        <AttachmentInput pickImage={this.selectAttachment} />
        {this.props.attachstate ? (
          <div>
            <Spinner size='md' animation='border' variant='primary' />
          </div>
        ) : this.props.attachments.length <= 0 ? (
          <div className='text-text-color'>No Attachments Found!</div>
        ) : (
          <>
            <div className='position-relative main-attach-div2 m-2'>
              <Gallery
                photos={this.props.attachments}
                renderImage={this.ImageComponent}
              />
            </div>
            <ModalGateway>
              {this.state.viewerIsOpen ? (
                <Modal onClose={this.closeLightbox}>
                  <Carousel
                    currentIndex={this.state.currentImage}
                    views={
                      this.props.attachments &&
                      this.props.attachments.map((x) => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: x.title,
                      }))
                    }
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </>
        )}
        <ModalList description1={this.props.description} />
      </div>
    );
  }
}

export default TicketDetailAttachment;
