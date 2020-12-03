import React, { Component } from 'react';
import './WorkOrdersModal.css';

import { Modal, Spinner } from 'react-bootstrap';
import WorkOrdersDetailAttachment from '../WorkOrdersDetailAttachment/WorkOrdersDetailAttachment';
import Card from '../../../components/CustomCard/CustomCard';
import CommentItem from '../../../components/CommentItem/CommentItem';
import Overflow from '../../../components/OverflowScroll/OverflowScroll';
import CommentForm from '../../../components/CommentForm/CommentForm';

import FailedModal from '../../../components/SuccessModal/SuccessModal';

// controllers

import WorkOrdersController from '../WorkOrdersController';
import { getValueForFieldId } from '../../../Utility/CommonMethods';

import WorkOrder from '../../../BussinessObjects/WorkOrder';
import Comment from '../../../BussinessObjects/Comment';

class TicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commenterName: '',
      attachments: [],
      spinnerState: true,
      attachstate: false,
      modalShow: false,

      // submitCard: false,
      // withdrawReason: '',
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props, state);
  // }

  componentDidMount() {}

  componentDidUpdate(preProps, preState) {
    console.log(preProps);
    if (preProps.rerender !== this.props.rerender) {
      this.getAllComments(preProps.recid);
      this.getWorkOrderAttachments(preProps.recid);
    }
  }

  componentWillUnmount() {}

  // get comments
  getAllComments = (recid) => {
    WorkOrdersController.getPostComments(recid, (res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        // console.log('res =>', res);
        if (res.data.relatedBusinessObjects) {
          for (let i = 0; i < res.data.relatedBusinessObjects.length; i++) {
            let details = getValueForFieldId(
              Comment.fields.Details,
              '',
              res.data.relatedBusinessObjects[i].fields
            );
            let createdByName = getValueForFieldId(
              Comment.fields.CreatedByName,
              '',
              res.data.relatedBusinessObjects[i].fields
            );
            let createdByDate = getValueForFieldId(
              Comment.fields.CreatedDateTime,
              '',
              res.data.relatedBusinessObjects[i].fields
            );

            this.setState({
              comments: [
                ...this.state.comments,
                {
                  details: details,
                  createdByName: createdByName,
                  createdByDate: createdByDate,
                },
              ],
            });
          }
        } else {
          this.setState({ comments: [] });
        }
      }
    });
  };

  workOrderCommentPost = (val) => {
    if (val === '') {
      // this.setState({ sweetAlertComment: true });
      return;
    } else {
      WorkOrdersController.allPostComments(this.props.recid, val, (res) => {
        console.log('comment posted ==>', res);
      });

      this.setState({
        comments: [
          ...this.state.comments,
          {
            details: val,
            createdByName: this.props.context.userName,
            createdByDate:
              new Date().toLocaleDateString() +
              ' ' +
              new Date().toLocaleTimeString(),
          },
        ],
      });
    }
  };

  getWorkOrderAttachments = (recid) => {
    let busobid = WorkOrder.busObId;

    this.setState({ attachstate: true });
    WorkOrdersController.getIncidentRelatedAttachments(
      busobid,
      recid,
      (res) => {
        if (res.data.attachments) {
          for (let i = 0; i < res.data.attachments.length; i++) {
            let name = res.data.attachments[i].attachmentFileName;
            let type = res.data.attachments[i].attachmentFileType;
            let url = res.data.attachments[i].links[1].url;

            this.fetchImage(url, (blob) => {
              if (type === 'pdf' || type === '.pdf') {
                blob = require('../../../assets/files-icons/pdf.png');
              } else if (
                type === 'doc' ||
                type === 'docx' ||
                type === 'docs' ||
                type === '.doc' ||
                type === '.docx' ||
                type === '.docs'
              ) {
                blob = require('../../../assets/files-icons/word.png');
              } else if (
                type === '.txt' ||
                type === 'txt' ||
                type === '.plain'
              ) {
                blob = require('../../../assets/files-icons/txt.png');
              } else if (
                type === 'ppt' ||
                type === 'pptm' ||
                type === 'pptx' ||
                type === '.ppt' ||
                type === '.pptm' ||
                type === '.pptx'
              ) {
                blob = require('../../../assets/files-icons/ppt.png');
              } else if (
                type === 'xls' ||
                type === 'xlsb' ||
                type === 'xlsm' ||
                type === 'xlsx' ||
                type === '.xls' ||
                type === '.xlsb' ||
                type === '.xlsm' ||
                type === '.xlsx'
              ) {
                blob = require('../../../assets/files-icons/excel.png');
              }

              this.setState({
                attachments: [
                  ...this.state.attachments,
                  { id: Math.random(), name: name, src: blob },
                ],
                attachstate: false,
              });
            });
          }
        } else {
          this.setState({ attachments: [], attachstate: false });
        }
      }
    );
  };

  uploadAttachments = (file, name, blob) => {
    let recid = this.props.recid;

    this.setState({
      attachments: [
        ...this.state.attachments,
        { id: Math.random(), name: name, src: blob },
      ],
    });

    WorkOrdersController.postIncidentRelatedAttachments(file, recid, (res) => {
      console.log('Attachment post ===>', res);
    });
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
  render() {
    // comments not show
    const { userinfo } = this.props;
    const { comments, attachments } = this.state;
    console.log('attachments =>', attachments);
    return (
      <>
        <Modal
          {...this.props}
          size='lg'
          aria-labelledby='contained-modal-comaround-vcenter'
          centered
          scrollable={false}
        >
          <Modal.Header className='ticketmodal-header' closeButton>
            <Modal.Title className='ticketmodel-title'>
              {this.props.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='ticketmodal-body'>
            <div className='d-flex px-1 py-3 align-items-start'>
              <WorkOrdersDetailAttachment
                subject={this.props.subject}
                assigned={this.props.assigned}
                status={this.props.status}
                description={this.props.description}
                classification={{
                  service: this.props.service,
                  category: this.props.category,
                  subcat: this.props.subcat,
                }}
                constyle='styleList'
                attachments={attachments}
                uploadAttachments={this.uploadAttachments}
                attachstate={this.state.attachstate}
              />
              <div className='content'>
                <Card className='d-flex flex-column justify-content-between c-container'>
                  {this.state.spinnerState ? (
                    <div className='w-100 text-center'>
                      <Spinner animation='border' variant='primary' />
                    </div>
                  ) : (
                    <Overflow>
                      {comments.length > 0 ? (
                        comments.map((item) => (
                          <CommentItem
                            key={Math.random()}
                            details={item.details}
                            createdByDate={item.createdByDate}
                            createdByName={item.createdByName}
                            avatar={userinfo.userAvatar}
                          />
                        ))
                      ) : (
                        <h3>No Data Found!</h3>
                      )}
                    </Overflow>
                  )}
                  <CommentForm postComment={this.ticketCommentPost} />
                </Card>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <FailedModal
          show={this.state.modalShow}
          onHide={(e) => this.setState({ modalShow: false })}
          title='Your Request could not submitted successfully'
          bodyColor='bg-danger'
          falseIcon
        />
      </>
    );
  }
}

export default TicketModal;
