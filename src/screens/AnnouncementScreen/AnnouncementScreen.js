import React, { Component } from 'react';
import './AnnouncementScreen.css';

import { Images } from '../../assets/Assets';

import { Row, Col, Spinner } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import { MdRefresh } from 'react-icons/md';
// import Input from '../../components/CustomInput/CustomInput';
import AnnouncementModal from './AnnouncementModal/AnnouncementModal';
import AnnouncementItem from './AnnouncementItem/AnnouncementItem';

// controllers
import Accouncements from '../../BussinessObjects/Announcement';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import AnnouncementController from './AnnouncementController';

class AnnouncementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      spinnerState: true,
      announcement: null,
      openModal: false,
      // searchField: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.getAnnouncements();

    if (location.state) {
      this.setState({
        announcement: location.state,
        openModal: true,
      });
    }
  }

  getAnnouncements = () => {
    AnnouncementController.announcements((res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        if (res.data.businessObjects) {
          let arrpen = [];
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              Accouncements.fields.AnnouncementId,
              '',
              res.data.businessObjects[i].fields
            );
            let subject = getValueForFieldId(
              Accouncements.fields.AnnouncementSubject,
              '',
              res.data.businessObjects[i].fields
            );
            let comment = getValueForFieldId(
              Accouncements.fields.AnnouncementComment,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              Accouncements.fields.AnnouncementLastModDate,
              '',
              res.data.businessObjects[i].fields
            );
            let lastDate = getValueForFieldId(
              Accouncements.fields.AnnouncementLastModDate,
              '',
              res.data.businessObjects[i].fields
            );
            // let ownedBy = getValueForFieldId(
            //   Approval.fields.ApproverName,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            // let lastModifiedDate = getValueForFieldId(
            //   Approval.fields.lastModifiedDate,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            // let parentTypeId = getValueForFieldId(
            //   Approval.fields.ParentTypeID,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            // let parentRecId = getValueForFieldId(
            //   Approval.fields.ParentRecID,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            // let deadLine = getValueForFieldId(
            //   Approval.fields.Deadline,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            // let RecID = getValueForFieldId(
            //   Approval.fields.RecID,
            //   '',
            //   res.data.businessObjects[i].fields
            // );

            arrpen.push({
              publicID: public_id,
              subject,
              // parentTypeId: parentTypeId,
              // parentRecId: parentRecId,
              // deadLine: deadLine,
              // RecID: RecID,
              comment,
              status,
              lastDate,
              // ownedBy: ownedBy,
              // lastModifiedDate: lastModifiedDate,
            });
          }
          this.setState({
            announcements: arrpen,
          });
        } else {
          this.setState({ annnouncements: [], spinnerState: false });
        }
      }
    });
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidUpdate(preProps, preState) {}

  refreshHandler = () => {
    this.setState({ announcements: [], loading: true });
    this.getAnnouncements();
  };

  render() {
    const { announcements } = this.state;
    return (
      <React.Fragment>
        <Row className='h-100'>
          <Col md={10} className='mx-auto h-100'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5 className='alert-heading mb-3'>
                Announcements{' '}
                <span className='d-inline-block text-text-color'>
                  ({announcements && announcements.length})
                </span>
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={this.refreshHandler}
                  className='d-inline-block ml-2'
                >
                  <MdRefresh size={26} />
                </i>
              </h5>
            </div>
            <div
              // style={{ overflowY: 'auto', overflowX: 'hidden' }}
              className='h-98'
            >
              <Row className='h-100'>
                {announcements.length <= 0 ? (
                  <div className='text-center w-100'>
                    <Spinner animation='border' size='md' variant='primary' />
                  </div>
                ) : announcements.length === 0 ? (
                  <div className='d-flex align-items-center justify-content-center w-100'>
                    <img
                      alt='no-data'
                      src={Images.nodata}
                      className='img-fluid'
                    />
                  </div>
                ) : (
                  announcements.map((item) => (
                    <Col
                      xl={6}
                      lg={6}
                      md={12}
                      sm={12}
                      key={item.publicID}
                      className='mb-4'
                    >
                      <Card className=''>
                        <AnnouncementItem
                          shortDescription={item.subject}
                          description={item.comment}
                          {...item}
                          data={announcements}
                          location={"announcements"}
                        />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </Col>
        </Row>
        {this.state.announcement && (
          <AnnouncementModal
            show={this.state.openModal}
            onHide={() => this.setState({ openModal: false })}
            {...this.state.announcement}
          />
        )}
      </React.Fragment>
    );
  }
}

export default AnnouncementScreen;
