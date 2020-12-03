import React from 'react';
import './SystemAlertModal.css';
import classnames from 'classnames';
import { Modal, Button } from 'react-bootstrap';
import Card from '../../../components/CustomCard/CustomCard';
import Accordion2 from '../../../components/Accordion2/Accordion2';
import ModalList from '../../../components/ModalList/ModalList';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import systemALertController from '../SystemAlertSController';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';

// import { NavLink } from 'react-router-dom';

class SystemAlertModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmationModal: false,
      loading: false,
      successModal: false,
      successTitle: '',
    };
  }

  componentDidMount() {}

  componentDidUpdate(preProps, preState) {
    if (preProps.show !== this.props.show) {
      this.props.nextAlertStateHandler(false);
    }
  }

  createTicketHandler = () => {
    this.setState({ loading: true });
    systemALertController.linkTicket(
      {
        service: this.props.nextAlertState? this.props.prevAlert.service : this.props.service,
        category: this.props.nextAlertState? this.props.prevAlert.category : this.props.category
      },
      this.props.nextAlertState ? this.props.prevAlert.recid : this.props.recid,
      this.props.nextAlertState? this.props.prevAlert.owned_by_team : this.props.owned_by_team,
      (res) => {
        if (res.success) {
          this.setState({
            successTitle: `Ticket #${res.data.busObPublicId} has been created successfully`,
            confirmationModal: false,
            loading: false,
            successModal: true,
          });
        }
      }
    );
  };

  nextAlert = () => {
    const { nextAlert } = this.props;
    console.log('nexticccc', nextAlert.publicID);
    if (nextAlert !== undefined || nextAlert !== {}) {
      this.props.nextAlertStateHandler(true);
      this.props.getNextAlert(nextAlert.id, true);
    }
  };

  render(){

    const { confirmationModal,loading, successModal,successTitle } = this.state;

    const {publicID,service,category,subcat,resolution,work_around,owned_by,description,shortDescription,status,
           nextAlertTitle, nextAlertState, prevAlert} = this.props;

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
            {nextAlertState ? prevAlert.publicID : publicID}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='smodal-body'>
          <div className='d-flex align-items-start px-3'>
          {nextAlertState ? 
            (
              <ModalList
              status1={prevAlert.status}
              assigned={prevAlert.owned_by}
              classification={{
                service: prevAlert.service,
                category: prevAlert.category,
                subcat: prevAlert.subcat,
              }}
              shortdescription1={prevAlert.shortDescription}
              description1={prevAlert.description}
            />
            )
            :
            (
              <ModalList
              status1={status}
              assigned={owned_by}
              classification={{
                service: service,
                category: category,
                subcat: subcat,
              }}
              shortdescription1={shortDescription}
              description1={description}
            />
            ) 
          }

            {/* <Card className='scard'>
                <Accordion2
                  title='Short Description'
                  titleStyle='scard-title'
                  desStyle='scard-desc '
                />
              </Card> */}
            <div className='smodal-body__right-side'>
              <div className='d-block mb-4'>
                <Card className='scard'>
                  <Accordion2
                    title='Work Around'
                    resolution={ nextAlertState
                      ? prevAlert.work_around : work_around}
                    titleStyle='scard-title'
                    desStyle='scard-desc '
                  />
                </Card>
              </div>
              <div className='d-block'>
                <Card className='scard'>
                  <Accordion2
                    title='Resolution'
                    resolution={ nextAlertState
                      ? prevAlert.resolution : resolution}
                    titleStyle='scard-title'
                    desStyle='scard-desc '
                  />
                </Card>
              </div>
            </div>
          </div>
          <div className='text-right'>
            {/* <NavLink
              to={{
                pathname: '/createticket',
                state: {
                  service: service,
                  category: category,
                  subcat: subcat,
                },
              }}
              replace
            > */}
            <div className='text-right my-2'>
                <Button
                  variant='secondary'
                  onClick={() => {
                    this.setState({ confirmationModal: !confirmationModal });
                  }}
                  className='mr-3 smodal-btn'
                >
                  Affects Me Too
                </Button>
              </div>
            {/* </NavLink> */}
          </div>

          <div className='d-flex align-items-center justify-content-end pt-2'>
              <div className='know-container__buttons__two'>
                <div className='next-btn'>
                  {this.props.nextAlertTitle === 'no more system alerts'
                    ? null
                    : 'Next Alert: '}
                  <span
                    className={classnames('ml-1', {
                      'next-article__link':
                        this.props.nextAlertTitle !== 'no more system alerts',
                      'font-italic':
                        this.props.nextAlertTitle === 'no more system alerts',
                    })}
                    onClick={
                      nextAlertTitle === 'no more system alerts'
                        ? null
                        : this.nextAlert
                    }
                  >
                    {nextAlertTitle && nextAlertTitle.length > 50
                      ? nextAlertTitle.substr(0, 50) + '...'
                      : nextAlertTitle}
                  </span>
                </div>
              </div>
            </div>

        </Modal.Body>
      </Modal>

      <ConfirmationModal
          show={confirmationModal}
          loading={loading}
          onHide={() =>
            this.setState({ confirmationModal: !confirmationModal })
          }
          title='Are you sure you want to create a ticket'
          closehandler={() =>
            this.setState({ confirmationModal: !confirmationModal })
          }
          createtickethandler={this.createTicketHandler}
        />

        <SuccessModal
          show={successModal}
          onHide={() => {
            this.props.onHide();
            this.setState({ successModal: false });
          }}
          title={successTitle}
          bodyColor='bg-primary'
          backdrop='static'
          iconhandler={() => {
            this.props.onHide();
            this.setState({ successModal: false });
          }}
        />

      </>
    );
  };
}

export default SystemAlertModal;
