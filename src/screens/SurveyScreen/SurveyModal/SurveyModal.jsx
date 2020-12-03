import React, { Component } from 'react';
import './SurveyModal.css';

import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import RatingItem from '../../../components/RatingItem/RatingItem';
import ModalSuccess from '../../../components/SuccessModal/SuccessModal';
import ModalList from '../../../components/ModalList/ModalList';

// controllers
import SurveyController from '../SurveyController';
import Incident from '../../../BussinessObjects/Incident';
import { getValueForFieldId } from '../../../Utility/CommonMethods';

class SurveyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate1: 0,
      rate2: 0,
      rate3: 0,
      rate4: 0,
      rate5: 0,
      feedback: '',
      feedbackError: false,
      successModal: false,
      spinnerState: true,
      incidentInfo: null,
    };
  }

  componentDidMount() {}

  componentDidUpdate(preProps, preState) {
    if (preProps.call !== this.props.call) {
      this.getRelatedIncidentInfo(this.props.parentrecid);
    }
    if (preProps.show !== this.props.show) {
      this.setState({ rate1: '', rate2: '', rate3: '', rate4: '', rate5: '' });
      this.getRelatedIncidentInfo(this.props.parentrecid);
    }
  }

  getRelatedIncidentInfo = () => {
    SurveyController.getSystemIncidentInfoForSurvey(
      this.props.parentrecid,
      (res) => {
        console.log(res);
        if (res.success === false) {
          localStorage.clear();
        } else {
          let public_id = getValueForFieldId(
            Incident.fields.PublicID,
            '',
            res.data.businessObjects[0].fields
          );
          let shortDescription = getValueForFieldId(
            Incident.fields.ShortDescription,
            '',
            res.data.businessObjects[0].fields
          );
          let description = getValueForFieldId(
            Incident.fields.Description,
            '',
            res.data.businessObjects[0].fields
          );
          let status = getValueForFieldId(
            Incident.fields.Status,
            '',
            res.data.businessObjects[0].fields
          );
          let ownedBy = getValueForFieldId(
            Incident.fields.OwnedBy,
            '',
            res.data.businessObjects[0].fields
          );
          let service = getValueForFieldId(
            Incident.fields.Service,
            '',
            res.data.businessObjects[0].fields
          );
          let category = getValueForFieldId(
            Incident.fields.Category,
            '',
            res.data.businessObjects[0].fields
          );
          let subcategoy = getValueForFieldId(
            Incident.fields.SubCategory,
            '',
            res.data.businessObjects[0].fields
          );
          let priority = getValueForFieldId(
            Incident.fields.Priority,
            '',
            res.data.businessObjects[0].fields
          );
          this.setState({
            incidentInfo: {
              publicID: public_id,
              description: description,
              status: status,
              owned_by: ownedBy,
              service: service,
              category: category,
              subcat: subcategoy,
              priority: priority,
              shortDescription,
            },
            spinnerState: false,
          });
        }
      }
    );
  };

  rateHandler1 = (val) => {
    this.setState({ rate1: val });
  };

  rateHandler2 = (val) => {
    this.setState({ rate2: val });
  };

  rateHandler3 = (val) => {
    this.setState({ rate3: val });
  };

  rateHandler4 = (val) => {
    this.setState({ rate4: val });
  };

  rateHandler5 = (val) => {
    this.setState({ rate5: val });
  };

  onHideModalSuccess = () => {
    this.setState({ successModal: false });
    this.props.onHide();  
  };

  submitFeedback = () => {
    if (this.state.feedback === '') {
      this.setState({ feedbackError: true });
    } else {
      SurveyController.surveyFeedback(
        this.props.nextSurveyState? this.props.prevSurvey.recId : this.props.recid,
        this.state.feedback,
        this.state.rate1,
        this.state.rate2,
        this.state.rate3,
        this.state.rate4,
        this.state.rate5,
        (res) => {
          if (res.success) {
            // alert('Feedback submitted Successfully!');
            this.setState({ successModal: true });
          }
        }
      );
    }
  };

  nextSur = () => {
    const { nextSurvey } = this.props;

    if (nextSurvey !== undefined || nextSurvey !== {}) {

      this.props.nextSurveyStateHandler();
      this.props.getNextSurvey(nextSurvey.id, true);
      this.getRelatedIncidentInfo(nextSurvey.ParentRecID)
    }
  };

  render() {
    const {
      incidentInfo,
      spinnerState,
      rate1,
      rate2,
      rate3,
      rate4,
      rate5,
      feedbackError,
    } = this.state;

    const {
             nextSurveyTitle} = this.props;

    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size='xl'
          aria-labelledby='contained-modal-comaround-vcenter'
          centered
          backdrop='static'
          scrollable={false}
        >
          <Modal.Header className='succmodal-header px-2' closeButton>
            <Modal.Title className='surveymodel-title'>
              {incidentInfo === null ? '....' : incidentInfo.publicID}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='surveymodal-body'>
            {spinnerState && incidentInfo === null ? (
              <div className='text-center w-100'>
                <Spinner animation='border' variant='primary' size={24} />
              </div>
            ) : (
              <div className='d-flex align-items-start justify-content-between px-2'>
                <ModalList
                  shortdescription1={
                    incidentInfo && incidentInfo.shortDescription
                  }
                  // status1={incidentInfo && incidentInfo.status}
                />
                <ModalList
                  classification={{
                    service: incidentInfo && incidentInfo.service,
                    category: incidentInfo && incidentInfo.category,
                    subcat: incidentInfo && incidentInfo.subcat,
                  }}
                />
              </div>
            )}

            <div className='my-1'>
              <RatingItem
                title='Rate the timeliness of your service'
                onChange={this.rateHandler1}
              />
              <RatingItem
                title='Rate the quality of your service'
                onChange={this.rateHandler4}
              />
              <RatingItem
                title='Rate the technicians ability to address your incident'
                onChange={this.rateHandler2}
              />
              <RatingItem
                title='Rate the courteousness of the technician'
                onChange={this.rateHandler3}
              />

              <RatingItem
                title='Rate your experience as a whole'
                onChange={this.rateHandler5}
              />
            </div>
            <Form.Group controlId='ControlTextarea1'>
              <Form.Control
                as='textarea'
                rows='6'
                placeholder='Please provide feedback'
                name='feedback'
                className='surverymodal__textarea'
                value={this.state.feedback}
                onChange={(e) =>
                  this.setState({
                    [e.target.name]: e.target.value,
                    feedbackError: false,
                  })
                }
              />
              {feedbackError && (
                <p className='text-danger'>Please provide Feedback</p>
              )}
            </Form.Group>
            <div className='text-right'>
              <Button
                varient='secondary'
                onClick={this.submitFeedback}
                disabled={!rate1 || !rate2 || !rate3 || !rate4 || !rate5}
              >
                Submit
              </Button>
            </div>

            <div className="d-flex align-items-center justify-content-end pt-1 pb-2">
              <div className='know-container__buttons__two'>

                  <div className='next-btn'>
                    {
                      this.props.nextSurveyTitle === 'no more surveys'?
                       null
                    : "Next Survey: "
                    }
                    <span
                      className={nextSurveyTitle === 'no more surveys' ? 
                                'font-italic' : 'know-next-article__link ml-1' }
                      onClick={
                        nextSurveyTitle === 'no more surveys'
                          ? null
                          : this.nextSur
                      }
                    >
                      {nextSurveyTitle && nextSurveyTitle.length > 50
                        ? nextSurveyTitle.substr(0, 50) + '...'
                        : nextSurveyTitle}
                    </span>
                  </div>

              </div>
            </div>

            
          </Modal.Body>
        </Modal>
        <ModalSuccess
          show={this.state.successModal}
          onHide={this.onHideModalSuccess}
          title='Your Survey Submitted Successfully'
          bodyColor='success-body'
          iconhandler={() => {
            this.props.onHide();
            this.props.refreshhandler();
          }}
        />
      </>
    );
  }
}

export default SurveyModal;
