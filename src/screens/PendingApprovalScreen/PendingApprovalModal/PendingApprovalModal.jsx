import React, { Component } from 'react';
import './PendingApprovalModal.css';

import { Images } from '../../../assets/Assets';
import classnames from 'classnames';


import { Modal, Button, Spinner } from 'react-bootstrap';
import ModalList from '../../../components/ModalList/ModalList';
import ApproveModal from '../PendingApproveModal/PendingApproveModal';
import DeniedModal from '../PendingRejectModal/PendingRejectModal';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';

// controllers

import ApprovalController from '../PendingApprovalsController';
import MyIncidentController from '../../MyTicketsScreen/MyIncidentController';

import Incident from '../../../BussinessObjects/Incident';
import ChangeRequest from '../../../BussinessObjects/ChangeRequest';
import Knowledge from '../../../BussinessObjects/Knowledge';

import { getValueForFieldId, getValueForFieldName } from '../../../Utility/CommonMethods';

class PendingApprovalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessObj: {},
      businessObjType: '',
      informationData: '',
      relatedData: [],
      approveModal: false,
      rejectModal: false,
      successModal: false,
      attachments: [],
      attachstate: false,
      requestorState: false,
      nextItemClick: false,
      // active: false,
      // active2: false,
    };
  }

  componentDidMount() {
    console.log('NOOOOOOOO' +this.props.recid);
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.open !== this.props.open) {
      this.getApprovalIncidentInformation(this.props.parentTypeId, this.props.parentRecId);
      // console.log('Component did mount!');
    }
  }

  getApprovalIncidentInformation = (parentTypeId, parentRecId) => {
    
    ApprovalController.informationForApprovals(
      // this.props.parentTypeId,
      // this.props.parentRecId,
      parentTypeId, parentRecId,
      (res) => {
        if (res.data.type === 'Knowledge') {
          this.setState({
            informationData: res.data.res,
            businessObj: Knowledge.fields,
            businessObjType: res.data.type,
            requestorState: true
          });
          this.getInformationValues();
        } else if (res.data.type === 'ChangeRequest') {
          this.setState({
            informationData: res.data.res,
            businessObj: ChangeRequest.fields,
            businessObjType: res.data.type,
            requestorState: true
          });
          this.getInformationValues();
        } else if (res.data.type === 'Incident') {
          this.setState({
            informationData: res.data.res,
            businessObj: Incident.fields,
            businessObjType: res.data.type,
            requestorState: true
          });
          this.getInformationValues();
          this.getIncidentAttachments(parentRecId);
        }
      }
    );
  };

  

  getInformationValues = () => {
    let approvalDetails = [];
    const { informationData, businessObj } = this.state;

    console.log("Information Data =>", informationData);

    if (informationData) {
      this.setState({ relatedData: [] });

      if (informationData.businessObjects !== undefined) {
        for (let i = 0; i < informationData.businessObjects.length; i++) {
          let change_id = getValueForFieldId(
            businessObj.ChangeID,
            '',
            informationData.businessObjects[i].fields
          );
          let public_id = getValueForFieldId(
            businessObj.PublicID,
            '',
            informationData.businessObjects[i].fields
          );
          let createdby = getValueForFieldId(
            businessObj.CreatedBy,
            '',
            informationData.businessObjects[i].fields
          );
          let created_date_time = getValueForFieldId(
            businessObj.CreatedDateTime,
            '',
            informationData.businessObjects[i].fields
          );
          let title = getValueForFieldId(
            businessObj.Title,
            '',
            informationData.businessObjects[i].fields
          );
          let description = getValueForFieldId(
            businessObj.Description,
            'No Description Found',
            informationData.businessObjects[i].fields
          );
          let short_description = getValueForFieldId(
            businessObj.ShortDescription,
            '',
            informationData.businessObjects[i].fields
          );
          let status = getValueForFieldId(
            businessObj.Status,
            '',
            informationData.businessObjects[i].fields
          );
          let type = getValueForFieldId(
            businessObj.IncidentType,
            '',
            informationData.businessObjects[i].fields
          );
          let changeRequestType = getValueForFieldId(
            businessObj.Type,
            '',
            informationData.businessObjects[i].fields
          );
          let requestor = getValueForFieldId(
            businessObj.CustomerDisplayName,
            '',
            informationData.businessObjects[i].fields,
          );
          let ownedby = getValueForFieldId(
            businessObj.OwnedBy,
            '',
            informationData.businessObjects[i].fields
          );
          let service = getValueForFieldId(
            businessObj.Service,
            'Not Found',
            informationData.businessObjects[i].fields
          );
          let category = getValueForFieldId(
            businessObj.Category,
            '',
            informationData.businessObjects[i].fields
          );
          let subcat = getValueForFieldId(
            businessObj.SubCategory,
            '',
            informationData.businessObjects[i].fields
          );
          let startDate = getValueForFieldId(
            businessObj.ProposedStartDate,
            '',
            informationData.businessObjects[i].fields
          );
          let endDate = getValueForFieldId(
            businessObj.ScheduledEndDate,
            '',
            informationData.businessObjects[i].fields
          );

          approvalDetails.push({
            requestor: requestor,
            changeid: change_id,
            publicID: public_id,
            description: description,
            createdby: createdby,
            title: title,
            shortDescription: short_description,
            status: status,
            createdDateAndTime: created_date_time,
            ownedby: ownedby,
            service: service,
            category: category,
            subcat: subcat,
            type: type,
            changeRequestType: changeRequestType,
            startDate: startDate,
            endDate: endDate,
            requestorState: this.state.requestorState

          });
        }
        this.setState({ relatedData: approvalDetails });
      } 
      else {
        console.log(informationData.fields)
        let article_id = getValueForFieldId(
          Knowledge.fields.KnowledgeArticleID,
          'No ID Found',
          informationData.fields
        );

        let title = getValueForFieldName(
          'Title',
          'Not Found',
          informationData.fields
        );

        let created_by = getValueForFieldName(
          'CreatedBy',
          'Not Found',
          informationData.fields
        );

        let description = getValueForFieldId(
          Knowledge.BodyText,
          'no description found',
          informationData.fields
        );

        approvalDetails.push({
          articleID: article_id,
          title: title,
          createdBy: created_by,
          description: description
        })

        this.setState({ relatedData: approvalDetails })
      }

      // console.log('info related data ====> ', this.state.relatedData);
    } else {
      this.setState({ relatedData: [] });
    }
  };



  fetchImage = (url, callback) => {
    let userToken = localStorage.getItem('login_token');
    let BlobUrl;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then((res) => res.blob())
      .then((content) => {
        BlobUrl = URL.createObjectURL(content);
        callback(BlobUrl);
      });
  };


  getIncidentAttachments = (recid) => {
    const busobid = Incident.busObId;

    this.setState({ attachstate: true });
    MyIncidentController.getIncidentRelatedAttachments(
      busobid,
      recid,
      (res) => {
        if (res.data.attachments.length > 0) {
          for (let i = 0; i < res.data.attachments.length || this.setState({attachState: false}); i++) {
            let name = res.data.attachments[i].attachmentFileName;
            let type = res.data.attachments[i].attachmentFileType;
            let url =
              'https://sigmago.herokuapp.com/' +
              res.data.attachments[i].links[1].url;

            // console.log("Types =>", type);

            this.fetchImage(url, (blob) => {
              if (type === 'pdf' || type === '.pdf') {
                blob = Images.pdfBlop;
              } else if (
                type === 'doc' ||
                type === 'docx' ||
                type === 'docs' ||
                type === '.doc' ||
                type === '.docx' ||
                type === '.docs' ||
                type === '.document'
              ) {
                blob = Images.wordBlop;
              } else if (
                type === '.txt' ||
                type === 'txt' ||
                type === '.plain'
              ) {
                blob = Images.txtBlop;
              } else if (
                type === 'ppt' ||
                type === 'pptm' ||
                type === 'pptx' ||
                type === '.ppt' ||
                type === '.pptm' ||
                type === '.pptx' ||
                type === '.ms-powerpoint'
              ) {
                blob = Images.pptBlop;
              } else if (
                type === 'xls' ||
                type === 'xlsb' ||
                type === 'xlsm' ||
                type === 'xlsx' ||
                type === '.xls' ||
                type === '.xlsb' ||
                type === '.xlsm' ||
                type === '.xlsx' ||
                type === '.sheet'
              ) {
                blob = Images.excelBlop;
              }
              this.setState({
                attachments: [
                  ...this.state.attachments,
                  { id: Math.random(), name: name, src: blob },
                ],

              });
            });
          }
          // this.setState({ attachstate: false })
        } else {
          this.setState({ attachments: [], attachstate: false });
        }
      }
    );
  };

  submitReasonApproval = ({ title, reason }) => {
    ApprovalController.postApproveDeny(
      this.props.nextApprovalState
      ? this.props.prevApproval.RecID
      : this.props.RecID,
      title,
      reason,
      (res) => {
        this.setState({ successModal: true });
        setTimeout(() => {
          this.setState({ successModal: false });
          this.props.onHide();
        }, [1000]);
        console.log('Result ===>', res);
      }
    );
  };


  nextApproval = () => {
    const { nextApproval } = this.props;
    console.log('nexticccc', nextApproval.publicID)
    if (nextApproval !== undefined || nextApproval !== {}) {
      
      this.setState({ nextItemClick: true , relatedData: [] });
      this.props.nextApprovalStateHandler();
      this.props.getNextApproval(nextApproval.publicID, true);
      this.getApprovalIncidentInformation(nextApproval.parentTypeId, nextApproval.parentRecId);
    }
  };

  render() {
    const { businessObjType, relatedData } = this.state;
    const {
      nextApprovalState,
      prevApproval,
    } = this.props;


    return (
      <>
        <Modal
          {...this.props}
          size='xl'
          aria-labelledby='contained-modal-comaround-vcenter'
          centered
          scrollable={false}
        >
          <Modal.Header className='smodal-header' closeButton>
            <Modal.Title className='smodel-title pt-2'>
              {/* {!nextItemClick ? this.props.id : nextApproval.publicID} */}
              {nextApprovalState ? prevApproval.publicID : this.props.id}
            </Modal.Title>
          </Modal.Header>
          {/* {relatedData.length <= 0 ? (
            <div className='text-center w-100'>
              <Spinner animation='border' size='md' variant='danger' />
            </div>
          ) : (
            relatedData.map((info) => ( */}
          <Modal.Body className='penmodal-body'>
            <div className='d-flex p-1'>
            <div className='d-flex flex-column justify-content-around' style={{flex: '0 0 40%'}}>
                <h4>Approval Information</h4>
                <ModalList
                  approvalid={
                    nextApprovalState ? prevApproval.publicID : this.props.id
                  }
                  deadline={
                    nextApprovalState
                      ? prevApproval.deadLine
                      : this.props.deadLine
                  }
                  details={
                    nextApprovalState
                      ? prevApproval.shortDescription
                      : this.props.shortDescription
                  }
                />
                <div className='d-flex align-content-center justify-content-end px-5'>
                  <Button
                    variant='outline-secondary'
                    onClick={this.props.affectedHandler}
                    className={classnames('penmodal-btn mr-2', {
                      'bg-secondary text-light': this.state.approveModal,
                    })}
                    onClick={() => this.setState({ approveModal: true })}
                  >
                    Approve
                  </Button>
                  <Button
                    variant='outline-secondary'
                    onClick={this.props.affectedHandler}
                    className={classnames('penmodal-btn', {
                      'bg-secondary text-light': this.state.rejectModal,
                    })}
                    onClick={() => this.setState({ rejectModal: true })}
                  >
                    Deny
                  </Button>
                </div>
              </div>

              {relatedData.length <= 0 ? (
                <div className='penflex'>
                  <Spinner animation='border' size='md' variant='danger' />
                </div>
              ) : (
                  relatedData.map((info) => (
                    <div className='pending-leftside'>
                      <ModalList
                        busobj={businessObjType}
                        ticketNo={
                          businessObjType === 'Incident'
                            ? info.publicID
                            : businessObjType === 'Knowledge'
                              ? info.article_id
                              : businessObjType === 'ChangeRequest'
                                ? info.changeid
                                : null
                        }
                        IncidentType={info.type}
                        shortDescription={info.shortDescription  === ''? 'no description found' : info.shortDescription}
                        requestor={info.requestor}
                        info={info}
                        // subject={
                        //   businessObjType === 'Incident'
                        //     ? 'Ticket Number'
                        //     : businessObjType === 'Knowledge'
                        //       ? 'Article Number'
                        //       : businessObjType === 'ChangeRequest'
                        //         ? 'Request Number'
                        //         : null
                        // }
                        status={info.status}
                        description={info.description === ''? 'no description found' : info.description}
                        createdDateAndTime={info.createdDateAndTime}
                        ownedby={info.ownedby}
                        changeid={info.changeid}
                        changeRequestType={info.changeRequestType}
                        startDate={info.startDate}
                        endDate={info.endDate}
                        requestorState={info.requestorState}
                        attachments={this.state.attachments}
                        attachState={this.state.attachstate}
                        articleID = {info.articleID === ''? 'No Article ID Found' : info.articleID}
                        title = {info.title}
                        createdBy = {info.createdBy}
                        className='penflex'
                      />
                    </div>
                  ))

                )
              }         
            </div>

            <div className="d-flex align-items-center justify-content-end pt-1 pb-2">
              <div className='know-container__buttons__two'>

                  <div className='next-btn'>
                    {
                      this.props.nextApprovalTitle === 'no more approvals'
                        ? null
                        : "Next Approval: "
                    }
                      <span
                        className={classnames('', {
                      'pending__link': this.props.nextApprovalTitle !== 'no more approvals',
                      'font-italic': this.props.nextApprovalTitle === 'no more approvals',
                    })}
                        onClick={
                          this.props.nextTicketTitle === 'no more approvals'
                            ? null
                            : this.nextApproval
                        }
                      >
                      
                      {this.props.nextApprovalTitle && this.props.nextApprovalTitle.length > 50
                      ? this.props.nextApprovalTitle.substr(0, 50) + '...'
                      : this.props.nextApprovalTitle ? this.props.nextApprovalTitle
                      : "no details found" }

                    </span>
                  </div>

              </div>
            </div>

          </Modal.Body>
        </Modal>
        <ApproveModal
          show={this.state.approveModal}
          onHide={() => this.setState({ approveModal: false })}
          submitReason={this.submitReasonApproval}
        />
        <DeniedModal
          show={this.state.rejectModal}
          onHide={() => this.setState({ rejectModal: false })}
          submitReason={this.submitReasonApproval}
        />
        <SuccessModal
          show={this.state.successModal}
          onHide={() => this.setState({ successModal: false })}
          title='Successfully Submitted'
          bodyColor='bg-primary'
          backdrop='static'
          iconhandler={() => {
            this.props.onHide();
            this.props.refreshhandler();
          }}
        />
      </>
    );
  }
}

export default PendingApprovalModal;
