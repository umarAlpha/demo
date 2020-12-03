import React, { Component } from 'react';
import './DashboardScreen.css';
import '../../styles/globalStyle.css';

import UserContext from '../../ContextApi/UserInfoContext/context';

import { Images } from '../../assets/Assets';

// components
import { Row, Col, Spinner } from 'react-bootstrap';
import CustomCard from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import CustomDoughnut from './charts/doughnut';
import TicketModal from '../MyTicketsScreen/TicketModal/TicketModal';
import PendingApprovalModal from '../PendingApprovalScreen/PendingApprovalModal/PendingApprovalModal';
import PendingApprovalItem from "../PendingApprovalScreen/PendingApprovalContainer/PendingApprovalContainer";
import MyTicketContainer from "../MyTicketsScreen/MyTicketContainer/MyTicketContainer";
// controllers
import IncidentController from './IncidentController';
import ApprovalController from '../PendingApprovalScreen/PendingApprovalsController';
import SurveyController from '../SurveyScreen/SurveyController';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import Incident from '../../BussinessObjects/Incident';
import Approval from '../../BussinessObjects/Approval';

class DashboardScreen extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      totalOpenTickets: 0,
      totalCloseTickets: 0,
      tickets: [],
      ticket: null,
      approval: null,
      rerender: false,
      open: false,
      totalPendingApproval: 0,
      surveyCount: 0,
      openIncidentInformation: {},
      approvals: [],
      // spinnerState: true,openIncidentInformation
      spinnerState: true,
      spinnerState2: true,
      modalShow: false,
      modalShow2: false,
    };
  }

  componentDidMount() {
    this.getMyOpenTickets();
    this.getMyapprovals();
    this.getCloseCount();
    this.getSurveysCount();
  }

  componentDidUpdate(preProps, preState) {}

  getCloseCount() {
    IncidentController.closeIncidents((res) => {
      this.setState({ totalCloseTickets: res.data.totalRows });
    });
  }

  getSurveysCount() {
    SurveyController.systemSurveys((res) => {
      if (res.success === false) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        this.setState({ surveyCount: res.data.totalRows });
      }
    });
  }

  getMyOpenTickets() {
    IncidentController.openIncidents((res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({
          spinnerState: false,
          totalOpenTickets: res.data.totalRows,
        });
        let arrtickets = [];

        if (res.data.businessObjects) {
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              Incident.fields.PublicID,
              '',
              res.data.businessObjects[i].fields
            );
            let description = getValueForFieldId(
              Incident.fields.Description,
              '',
              res.data.businessObjects[i].fields
            );
            let short_description = getValueForFieldId(
              Incident.fields.ShortDescription,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              Incident.fields.Status,
              '',
              res.data.businessObjects[i].fields
            );
            let ownedBy = getValueForFieldId(
              Incident.fields.OwnedBy,
              '',
              res.data.businessObjects[i].fields
            );
            let createdDateTime = getValueForFieldId(
              Incident.fields.CreatedDateTime,
              '',
              res.data.businessObjects[i].fields
            );
            let service = getValueForFieldId(
              Incident.fields.Service,
              '',
              res.data.businessObjects[i].fields
            );
            let category = getValueForFieldId(
              Incident.fields.Category,
              '',
              res.data.businessObjects[i].fields
            );
            let subcat = getValueForFieldId(
              Incident.fields.SubCategory,
              '',
              res.data.businessObjects[i].fields
            );
            let recId = getValueForFieldId(
              Incident.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            arrtickets.push({
              publicID: public_id,
              description: description,
              shortDescription: short_description,
              status: status,
              ownedBy: ownedBy,
              createdDateTime: createdDateTime,
              service: service,
              category: category,
              subcat: subcat,
              recId: recId,
            });
          }

          this.setState({
            tickets: arrtickets,
          });
        } else {
          this.setState({ tickets: [] });
        }
      }
    });
  }

  getMyapprovals() {
    ApprovalController.pendingApprovalPerPage(1, 10, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ spinnerState2: false });

        if (res.data.businessObjects) {
          this.setState({ totalPendingApproval: res.data.totalRows });
          let arrpen = [];
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              Approval.fields.ApprovalID,
              '',
              res.data.businessObjects[i].fields
            );
            let description = getValueForFieldId(
              Approval.fields.ParentTypeName,
              '',
              res.data.businessObjects[i].fields
            );
            let short_description = getValueForFieldId(
              Approval.fields.Details,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              Approval.fields.Status,
              '',
              res.data.businessObjects[i].fields
            );
            let ownedBy = getValueForFieldId(
              Approval.fields.ApproverName,
              '',
              res.data.businessObjects[i].fields
            );
            let lastModifiedDate = getValueForFieldId(
              Approval.fields.lastModifiedDate,
              '',
              res.data.businessObjects[i].fields
            );
            let parentTypeId = getValueForFieldId(
              Approval.fields.ParentTypeID,
              '',
              res.data.businessObjects[i].fields
            );
            let parentRecId = getValueForFieldId(
              Approval.fields.ParentRecID,
              '',
              res.data.businessObjects[i].fields
            );
            let deadLine = getValueForFieldId(
              Approval.fields.Deadline,
              '',
              res.data.businessObjects[i].fields
            );
            let RecID = getValueForFieldId(
              Approval.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            arrpen.push({
              publicID: public_id,
              description: description,
              parentTypeId: parentTypeId,
              parentRecId: parentRecId,
              deadLine: deadLine,
              RecID: RecID,
              shortDescription: short_description,
              status: status,
              ownedBy: ownedBy,
              lastModifiedDate: lastModifiedDate,
            });
          }
          this.setState({
            approvals: arrpen,
          });
        } else {
          this.setState({ approvals: [] });
        }
      }
    });
  }

  refreshHandler = () => {
    this.setState({ tickets: [], spinnerState: true });
    this.getMyOpenTickets();
  };

  refreshHandler1 = () => {
    this.setState({ approvals: [], spinnerState2: true });
    this.getMyapprovals();
  };

  navigationHandler = (route) => {
    this.props.history.push(route);
  };


  render() {
    const {
      tickets,
      ticket,
      totalPendingApproval,
      approvals,
      approval,
      totalOpenTickets,
      totalCloseTickets,
      surveyCount,
      spinnerState,
      spinnerState2,
    } = this.state;

    return (
      <React.Fragment>
        <Row className='h-100 left-boxes'>
          <Col sm={12} md={6} lg={6} xl={6} className='mb-sm-2 mb-xs-2 h-100'>
            <Row className='h-100'>
              <Col md={12} className='mb-sm-2 h-48'>
                <CustomCard title={`MY ITEMS`} className='h-100'>
                  <CustomDoughnut
                    open={totalOpenTickets}
                    close={totalCloseTickets}
                    pending={totalPendingApproval}
                    survey={surveyCount}
                  />
                </CustomCard>
              </Col>
              <Col md={12} className='h-50'>
                <CustomCard
                  title='Pending Approvals'
                  total={totalPendingApproval}
                  className='h-100'
                  button
                  navigationHandler={() =>
                    this.navigationHandler('pendingApproval')
                  }
                  refresh
                  refreshHandler={this.refreshHandler1}
                >
                  <OverflowScroll>
                    {spinnerState2 ? (
                      <div className='text-center w-100'>
                        <Spinner
                          animation='border'
                          size='md'
                          variant='primary'
                        />
                      </div>
                    ) : approvals.length <= 0 ? (
                      <div className='d-flex align-items-center justify-content-center w-100'>
                        <img
                          alt='no-data'
                          src={Images.alldonesm}
                          className='img-fluid'
                        />
                      </div>
                    ) : (
                      approvals.map((item) => (
                        <PendingApprovalItem
                        key={item.publicID}
                        id={item.publicID}
                        recid={item.RecID}
                        issuename={item.shortDescription}
                        type={item.type}
                        // issuedesc={item.description}
                        status={item.status}
                        assignedto={item.ownedBy}
                        date={item.lastModifiedDate}
                        ownedby={item.ownedBy}
                        data={approvals}
                        {...item}
                        refreshhandler={this.refreshHandler}
                        location='Dashboard'
                      />
                      ))
                    )}
                  </OverflowScroll>
                </CustomCard>
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6} lg={6} xl={6} className='mb-sm-3 mt-xs-4 h-100'>
            <CustomCard
              title='My Open Tickets'
              total={tickets.length}
              button
              className='h-100'
              navigationHandler={() => this.navigationHandler('myticket')}
              refresh
              refreshHandler={this.refreshHandler}
            >
              <OverflowScroll>
                {spinnerState ? (
                  <div className='text-center w-100'>
                    <Spinner animation='border' size='md' variant='primary' />
                  </div>
                ) : tickets.length <= 0 ? (
                  <div className='d-flex align-items-center justify-content-center w-100'>
                    <img
                      alt='no-data'
                      src={Images.alldonesm}
                      className='img-fluid'
                    />
                  </div>
                ) : (
                  tickets.map((item) => (
                    <MyTicketContainer
                      key={Math.random()}
                      id={item.publicID}
                      recid={item.recId}
                      issuename={item.description}
                      issuedesc={item.description}
                      status={item.status}
                      assignedto={item.ownedBy}
                      date={item.createdDateTime}
                      lastModifiedDate={item.lastModifiedDate}
                      service={item.service}
                      category={item.category}
                      subcat={item.subcat}
                      withdraw={item.withdraw}
                      ticketType={item.ticketType}
                      refreshList={this.refreshHandler}
                      data={tickets}
                      location={"Dashboard"}
                    />
                  ))
                )}
              </OverflowScroll>
            </CustomCard>
          </Col>
        </Row>
        <UserContext.Consumer>
          {(context) => (
            <TicketModal
              show={this.state.modalShow}
              onHide={() =>
                this.setState({ modalShow: false, rerender: false })
              }
              rerender={this.state.rerender}
              id={ticket && ticket.publicID}
              subject={ticket && ticket.issueName}
              assigned={ticket && ticket.assignedTo}
              status={ticket && ticket.status}
              description={ticket && ticket.description}
              recid={ticket && ticket.recId}
              service={ticket && ticket.service}
              category={ticket && ticket.category}
              subcat={ticket && ticket.subcat}
              userinfo={context && context.user}
              refreshList={this.refreshHandler}
            />
          )}
        </UserContext.Consumer>
        <PendingApprovalModal
          show={this.state.modalShow2}
          onHide={() => this.setState({ modalShow2: false, open: false })}
          details={approval && approval.shortDescription}
          id={approval && approval.publicID}
          recid={approval && approval.RecID}
          issuename={approval && approval.shortDescription}
          issuedesc={approval && approval.description}
          status={approval && approval.status}
          assignedto={approval && approval.ownedBy}
          date={approval && approval.lastModifiedDate}
          ownedby={approval && approval.ownedBy}
          {...approval}
          open={this.state.open}
        />
      </React.Fragment>
    );
  }
}

export default DashboardScreen;
