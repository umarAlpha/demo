import React, { Component } from 'react';
import './TicketModal.css';

// images
import { Images } from '../../../assets/Assets';

import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import TicketDetailAttachment from '../TicketDetailAttachment/TicketDetailAttachment';
import Card from '../../../components/CustomCard/CustomCard';
import CommentItem from '../../../components/CommentItem/CommentItem';
import Overflow from '../../../components/OverflowScroll/OverflowScroll';
import CommentForm from '../../../components/CommentForm/CommentForm';
import { FaTimes } from 'react-icons/fa';

import FailedModal from '../../../components/SuccessModal/SuccessModal';

// controllers
import MyIncidentController from '../MyIncidentController';
import { getValueForFieldId } from '../../../Utility/CommonMethods';
import Comment from '../../../BussinessObjects/Comment';
import Incident from '../../../BussinessObjects/Incident';

class TicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComments: {},
      comments: [],
      commenterName: '',
      attachments: [],
      spinnerState: true,
      attachstate: false,
      modalShow: false,

      submitCard: false,
      withdrawReason: '',
    };
  }

  componentDidMount() { }

  componentDidUpdate(preProps, preState) {
    if (preProps.rerender !== this.props.rerender) {
      this.getAllComments(this.props.recid);
      this.getIncidentAttachments(this.props.recid);
    }
  }

  componentWillUnmount() { }

  // get comments
  getAllComments = (recid) => {
    MyIncidentController.getPostComments(recid, (res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        console.log(res.data);
        this.setState({ allComments: res.data, spinnerState: false });
        if (this.state.allComments.relatedBusinessObjects) {
          this.setState({ comments: [] });
          for (
            let i = 0;
            i < this.state.allComments.relatedBusinessObjects.length;
            i++
          ) {
            let details = getValueForFieldId(
              Comment.fields.Details,
              '',
              this.state.allComments.relatedBusinessObjects[i].fields
            );
            let createdByName = getValueForFieldId(
              Comment.fields.CreatedByName,
              '',
              this.state.allComments.relatedBusinessObjects[i].fields
            );
            let createdByDate = getValueForFieldId(
              Comment.fields.CreatedDateTime,
              '',
              this.state.allComments.relatedBusinessObjects[i].fields
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

  ticketCommentPost = (val) => {
    if (val === '') {
      alert('Please write comment!');
    } else {
      MyIncidentController.allPostComments(this.props.recid, val, (res) => {
        console.log('comment posted ==>', res);
      });

      this.setState({
        comments: [
          ...this.state.comments,
          {
            details: val,
            createdByName: this.props.userinfo.userName,
            createdByDate:
              new Date().toLocaleDateString() +
              ' ' +
              new Date().toLocaleTimeString(),
          },
        ],
      });
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

    this.setState({ attachstate: true, attachments: [] });
    MyIncidentController.getIncidentRelatedAttachments(
      busobid,
      recid,
      (res) => {
        if (res.data.attachments.length > 0) {
          for (let i = 0; i < res.data.attachments.length; i++) {
            let name = res.data.attachments[i].attachmentFileName;
            let type = res.data.attachments[i].attachmentFileType;
            let url = res.data.attachments[i].links[1].url;

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
          this.setState({ attachstate: false })
        } else {
          this.setState({ attachments: [], attachstate: false });
        }
      }
    );
  };

  uploadAttachments = (file, name, blob) => {
    let blobs = blob;
    let recid = this.props.recid;

    if (name.includes('pdf') || name.includes('.pdf')) {
      blobs = Images.pdfBlop;
    } else if (
      name.includes('doc') ||
      name.includes('docx') ||
      name.includes('docs') ||
      name.includes('.doc') ||
      name.includes('.docx') ||
      name.includes('.docs') ||
      name.includes('.document')
    ) {
      blobs = Images.wordBlop;
    } else if (
      name.includes('.txt') ||
      name.includes('txt') ||
      name.includes('.plain')
    ) {
      blobs = Images.txtBlop;
    } else if (
      name.includes('ppt') ||
      name.includes('pptm') ||
      name.includes('pptx') ||
      name.includes('.ppt') ||
      name.includes('.pptm') ||
      name.includes('.pptx') ||
      name.includes('.ms-powerpoint')
    ) {
      blobs = Images.pptBlop;
    } else if (
      name.includes('xls') ||
      name.includes('xlsb') ||
      name.includes('xlsm') ||
      name.includes('xlsx') ||
      name.includes('.xls') ||
      name.includes('.xlsb') ||
      name.includes('.xlsm') ||
      name.includes('.xlsx') ||
      name.includes('.sheet')
    ) {
      blobs = Images.excelBlop;
    }

    this.setState({
      attachments: [
        ...this.state.attachments,
        { id: Math.random(), name: name, src: blobs },
      ],
    });

    MyIncidentController.postIncidentRelatedAttachments(file, recid, (res) => {
      console.log('Attachment post ===>', res);
    });
  };

  withdraw = (e) => {
    e.preventDefault();
    if (this.state.withdrawReason !== '') {
      MyIncidentController.allWithDrawTickets(
        this.props.nextTicketState? this.props.prevTicket.recId : this.props.recid,
        'Closed',
        this.state.withdrawReason,
        (res) => {
          if (res.success === true) {
            this.props.onHide();
            this.props.refreshList();
          } else {
            this.setState({ modalShow: true });
          }
        }
      );
    } else {
      return;
    }
  };

  nextTic = () => {
    const { nextTicket } = this.props;
    console.log('nexticccc', nextTicket.status, nextTicket.publicID, this.props.nextTicketState)
    if (nextTicket !== undefined || nextTicket !== {}) {

      this.props.nextTicketStateHandler();
      this.getIncidentAttachments(nextTicket.recId);
      this.getAllComments(nextTicket.recId);
      this.props.getNextTicket(nextTicket.publicID, true);

    }
  };

  render() {
    const { userinfo, nextTicketTitle, nextTicketState, prevTicket, } = this.props;
    const { comments, attachments } = this.state;
    return (
      <React.Fragment>
        <Modal
          {...this.props}
          size='xl'
          aria-labelledby='contained-modal-comaround-vcenter'
          centered
          scrollable={false}
        >
          <Modal.Header className='ticketmodal-header' closeButton>
            <Modal.Title className='ticketmodel-title'>
            {!nextTicketState ? this.props.id : prevTicket.publicID}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='ticketmodal-body'>
          {nextTicketState ?
              prevTicket.status !== 'Closed' && (
              prevTicket.status !== 'Resolved' && (
                <div className='text-right ticket-btn-container'>
                  <Button
                    variant='outline-danger'
                    className='ticket-btn'
                    onClick={() => this.setState({ submitCard: true })}
                  >
                    {`Withdraw Ticket`}
                  </Button>
                </div>
              ))
              :
             this.props.status !== 'Closed' && (
              this.props.status !== 'Resolved' && (
                <div className='text-right ticket-btn-container'>
                  <Button
                    variant='outline-danger'
                    className='ticket-btn'
                    onClick={() => this.setState({ submitCard: true })}
                  >
                    {`Withdraw Ticket`}
                  </Button>
                </div>
              ))
            }

            {nextTicketState ?
              prevTicket.withdraw === 'True' && (
                <div className='text-center font-weight-bold' style={{paddingBottom:'10px'}}>
                  <span className='d-inline-block text-danger'>

                    {`Ticket has been withdrawn`}
                  </span>
                </div>
              )

              :

              this.props.withdraw === 'True' && (
                <div className='text-center font-weight-bold' style={{paddingBottom:'10px'}} >
                  <span className='d-inline-block text-danger'>

                    {`Ticket has been withdrawn`}
                  </span>
                </div>
              )
            }
            <div className='d-flex px-1 py-3 align-items-start'>
            {!nextTicketState ?
                <TicketDetailAttachment
                  subject={this.props.subject}
                  assigned={this.props.assigned}
                  shortDescription={this.props.shortDescription}
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

                :

                <TicketDetailAttachment
                  subject={prevTicket.subject}
                  assigned={prevTicket.assigned}
                  shortDescription={this.props.shortDescription}
                  status={prevTicket.status}
                  description={prevTicket.description}
                  classification={{
                    service: prevTicket.service,
                    category: prevTicket.category,
                    subcat: prevTicket.subcat,
                  }}
                  constyle='styleList'
                  attachments={attachments}
                  uploadAttachments={this.uploadAttachments}
                  attachstate={this.state.attachstate}
                />
              }
              <div className='content'>
                {!this.state.submitCard ? (
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
                                avatar={
                                  userinfo.userAvatar && userinfo.userAvatar
                                }
                              />
                            ))
                          ) : (
                              <div className='not-found'>
                                <img
                                  src={Images.nocomment}
                                  alt='make-comment'
                                  className='img-fluid'
                                />
                                <div className='text-text-color font-weight-bold'>
                                  Make a Comment
                            </div>
                              </div>
                            )}
                        </Overflow>
                      )}
                    <CommentForm postComment={this.ticketCommentPost} />
                  </Card>
                ) : (
                    <Card className='d-flex flex-column justify-content-between c-container'>
                      <div
                        style={{
                          color: 'var(--primary)',
                          position: 'absolute',
                          right: '0.5rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => this.setState({ submitCard: false })}
                      >
                        <FaTimes />
                      </div>
                      <Form onSubmit={this.withdraw} className='mt-1 '>
                        <Form.Group>
                          <Form.Label className='text-primary font-weight-bold'>
                            Withdraw Ticket
                        </Form.Label>
                          <Form.Control
                            name='withdrawReason'
                            as='textarea'
                            rows={8}
                            placeholder='Write Description Here'
                            value={this.state.withdrawReason}
                            onChange={(e) =>
                              this.setState({ withdrawReason: e.target.value })
                            }
                          />
                        </Form.Group>
                        <div className='text-center bg-secondary bor-5 p-2'>
                          <Button
                            className='bor-5'
                            type='submit'
                            variant='primary'
                          >
                            Submit
                        </Button>
                        </div>
                      </Form>
                    </Card>
                  )}
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end pt-1 pb-2">
              <div className='know-container__buttons__two'>

                <div className='next-btn'>
                  {
                    this.props.nextTicketTitle === 'no more tickets'
                      ? null
                      : "Next Ticket: "
                  }
                  <span
                    className={this.props.nextTicketTitle === 'no more tickets' ? 
                              'font-italic' : 'ticket__link ml-1' }
                    onClick={
                      this.props.nextTicketTitle === 'no more tickets'
                        ? null
                        : this.nextTic
                    }
                  >

                    {nextTicketTitle && nextTicketTitle.length > 50
                      ? nextTicketTitle.substr(0, 50) + '...'
                      : nextTicketTitle}

                  </span>
                </div>

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
      </React.Fragment>
    );
  }
}

export default TicketModal;
