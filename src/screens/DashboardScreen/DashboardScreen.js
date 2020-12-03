import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DashboardScreen.css';
import '../../styles/globalStyle.css';

import { Images } from '../../assets/Assets';

// components
import { Row, Col, Spinner } from 'react-bootstrap';
import CustomCard from '../../components/CustomCard/CustomCard';
import TicketItem from '../../components/TicketItem/TicketItem';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import CustomDoughnut from './charts/doughnut';

// controllers
import IncidentController from './IncidentController';
import ApprovalController from '../PendingApprovalScreen/PendingApprovalsController';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import Incident from '../../BussinessObjects/Incident';
import Approval from '../../BussinessObjects/Approval';

// context
import CountsContext from '../../ContextApi/CountsContext/context';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCount: 0,
      pendindCount: 0,
      assignedCount: 0,
      inProgressCount: 0,
      resolvedCount: 0,
      tickets: [],
      totalPendingApproval: 0,
      // closeTicketCount: 0,
      openIncidentInformation: {},
      approvals: [],
      // spinnerState: true,openIncidentInformation
      spinnerState: true,
      spinnerState2: true,
    };
  }

  componentDidMount() {
    this.getMyOpenTickets();
    this.getMyapprovals();
    // this.getCloseIncidents();
    // this.getOpenIncidentsdata();
    // this.getMyapprovals();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.tickets.length !== this.state.tickets.length) {
      this.statusCountOrCounter({
        new: 'New',
        closed: 'Closed',
        pending: 'Pending',
        assigned: 'Assigned',
        inprogress: 'In Progress',
        resolved: 'Resolved',
      });
    }
  }

  getMyOpenTickets() {
    IncidentController.openIncidents((res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        this.setState({ spinnerState: false });
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
            // arrayTickets: arrtickets,
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
            // let description = getValueForFieldId(
            //   Approval.fields.ParentTypeName,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
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
            // let ownedBy = getValueForFieldId(
            //   Approval.fields.ApproverName,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            let RecID = getValueForFieldId(
              Approval.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            arrpen.push({
              publicID: public_id,
              // description: description,

              // deadLine: deadLine,
              RecID: RecID,
              shortDescription: short_description,
              status: status,
              // ownedBy: ownedBy,
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

  statusCountOrCounter = (status) => {
    if (status.new === 'New') {
      this.setState({
        newCount: this.state.tickets.filter((i) => i.status === status.new)
          .length,
      });
    }

    if (status.closed === 'Closed') {
      this.setState({
        closedCount: this.state.tickets.filter(
          (i) => i.status === status.closed
        ).length,
      });
    }

    if (status.pending === 'Pending') {
      this.setState({
        pendindCount: this.state.tickets.filter(
          (i) => i.status === status.pending
        ).length,
      });
    }

    if (status.assigned === 'Assigned') {
      this.setState({
        assignedCount: this.state.tickets.filter(
          (i) => i.status === status.assigned
        ).length,
      });
    }

    if (status.inprogress === 'In Progress') {
      this.setState({
        inProgressCount: this.state.tickets.filter(
          (i) => i.status === status.inprogress
        ).length,
      });
    }

    if (status.resolved === 'Resolved') {
      this.setState({
        resolvedCount: this.state.tickets.filter(
          (i) => i.status === status.resolved
        ).length,
      });
    }
  };

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
      newCount,
      assignedCount,
      closedCount,
      pendindCount,
      inProgressCount,
      totalPendingApproval,
      // resolvedCount,
      // openIncidentInformation,
      // closeTicketCount,
      approvals,
      spinnerState,
      spinnerState2,
    } = this.state;

    // console.log('Approvals', approvals);

    return (
      <>
        <CountsContext.Consumer>
          {(value) => (
            <Row>
              <Col sm={12} md={6} lg={6} xl={6} className='mb-sm-2 mb-xs-2'>
                <Row>
                  <Col md={12} className='mb-4 mb-sm-4'>
                    <CustomCard title={`MY ITEMS`} className='height-14'>
                      <CustomDoughnut
                        open={tickets.length}
                        close={value.counters.closedCount}
                        pending={value.counters.pendingCount}
                        survey={value.counters.surveyCount}
                        // pending={pendindCount}
                        // assigned={assignedCount}
                        // inprogress={inProgressCount}
                        // resolved={resolvedCount}
                      />
                    </CustomCard>
                  </Col>
                  <Col md={12}>
                    <CustomCard
                      title='Pending Approvals'
                      total={totalPendingApproval}
                      className='height-14'
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
                              // style={{width: '100%', height: '8rem'}}
                            />
                            {/* <p>Sorry troubleshoting</p> */}
                          </div>
                        ) : (
                          approvals.map((item) => (
                            <TicketItem
                              key={item.id}
                              id={item.publicID}
                              issuename={item.shortDescription}
                              status={item.status}
                              statusStyle='statusStyle'
                              navigationhandler={() =>
                                this.navigationHandler('/pendingApproval')
                              }
                            />
                          ))
                        )}
                      </OverflowScroll>
                    </CustomCard>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className='mb-sm-3 mt-xs-4'>
                {/* <Row>
                  <Col md={12} className='mb-4'> */}
                <CustomCard
                  title='My Open Tickets'
                  total={tickets.length} //newCount + pendindCount + assignedCount + inProgressCount
                  button
                  className='height-29'
                  navigationHandler={() => this.navigationHandler('myticket')}
                  refresh
                  refreshHandler={this.refreshHandler}
                >
                  <OverflowScroll>
                    {spinnerState ? (
                      <div className='text-center w-100'>
                        <Spinner
                          animation='border'
                          size='md'
                          variant='primary'
                        />
                      </div>
                    ) : tickets.length <= 0 ? (
                      <div className='d-flex align-items-center justify-content-center w-100'>
                        <img
                          alt='no-data'
                          src={Images.alldonesm}
                          className='img-fluid'
                          // style={{width: '100%', height: '8rem'}}
                        />
                        {/* <p>Sorry troubleshoting</p> */}
                      </div>
                    ) : (
                      tickets
                        // .filter((item) => item.status !== 'Closed' || item.status !== 'Resolved')
                        .map((item) => (
                          <Link
                            to={{
                              pathname: '/myticket',
                              state: { ticket: item },
                            }}
                            style={{ textDecoration: 'none' }}
                            replace
                          >
                            <TicketItem
                              key={item.id}
                              id={item.publicID}
                              issuename={item.shortDescription}
                              status={item.status}
                              statusStyle='statusStyle'
                              navigationhandler={() =>
                                this.navigationHandler('/myticket')
                              }
                            />
                          </Link>
                        ))
                    )}
                  </OverflowScroll>
                </CustomCard>
                {/* </Col>
                  <Col md={12}> */}
                {/* </Col>
                </Row> */}
              </Col>
            </Row>
          )}
        </CountsContext.Consumer>
      </>
    );
  }
}

export default DashboardScreen;
