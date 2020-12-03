import React, {useState} from 'react';
import './AnnouncementModal.css';

import { Modal } from 'react-bootstrap';
// import Card from '../../../components/CustomCard/CustomCard';
// import Accordion2 from '../../../components/Accordion2/Accordion2';
import ModalList from '../../../components/ModalList/ModalList';

const SystemAlertModal = (props) => {

  // hook
  const [nextItemClick,setNextItemClick] = useState(false);

  const nextAnnouncement = () => {
    const { nextAnnouncement } = props;
    console.log('nexticccc', nextAnnouncement.publicID)
    if (nextAnnouncement !== undefined || nextAnnouncement !== {}) {
      
      setNextItemClick(true);
      props.nextAnnouncementStateHandler();
      props.getNextAnnouncement(nextAnnouncement.publicID, true);
    }
  }

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-comaround-vcenter'
      centered
      scrollable={false}
    >
      <Modal.Header className='amodal-header' closeButton>
        <Modal.Title className='amodel-title pt-2'>{!nextItemClick ? props.publicID : props.prevAnnouncement.publicID}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='amodal-body'>
       
          <ModalList
            status1='Current'
            subject={!nextItemClick ? props.subject : props.prevAnnouncement.subject}
            comment={!nextItemClick ? props.comment : props.prevAnnouncement.comment}
          />
       
       <div className="d-flex align-items-center justify-content-end pt-2">
          <div className='know-container__buttons__two'>

              <div className='next-btn'>
              {
                  props.nextAnnouncementTitle === 'no more announcements'
                    ? null
                    : "Next Announcement: "
                }
                <span
                  className={props.nextAnnouncementTitle === 'no more announcements' ?
                            'font-italic' : 'linked__link ml-1' }
                  onClick={
                    props.nextAnnouncementTitle === 'no more announcements'
                      ? null
                      : () => nextAnnouncement()
                  }
                >
                  
                  {props.nextAnnouncementTitle && props.nextAnnouncementTitle.length > 50
                  ? props.nextAnnouncementTitle.substr(0, 50) + '...'
                  : props.nextAnnouncementTitle ? props.nextAnnouncementTitle
                  : "no details found" }
                </span>
              </div>

          </div>
        </div>
       
      </Modal.Body>
    </Modal>
  );
};

export default SystemAlertModal;
