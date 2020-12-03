import React, { Component } from 'react';
import './MyTicketScreen.css';
import '../../styles/globalStyle.css';

import { Images } from '../../assets/Assets';

// components
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import MyTicketContainer from './MyTicketContainer/MyTicketContainer';
import Spinner from 'react-bootstrap/Spinner';
import TicketHeader from '../../components/TicketHeader/TicketHeader';

import { getValueForFieldId } from '../../Utility/CommonMethods';
import Incident from '../../BussinessObjects/Incident';
import MyIncidentController from './MyIncidentController';

// data
import { filters } from '../../assets/Data';

class MyTicketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      arrayTickets: [],
      spinnerState: true,
      defaultvalue: 'All',
      prePageRow: 10,
      totalRows: 0,
      page: 1,
      initialPage: 0,
      forcePage: false,
    };
  }

  componentDidMount() {
    const { location } = this.props.history;

    if (location.state) {
      if (location.state.status === 'New') {
        this.setState({ defaultvalue: 'Open Tickets' });
        return this.getMyAllTickets('Open Tickets', 1, this.state.prePageRow);
      }

      if (location.state.status === 'Closed') {
        this.setState({ defaultvalue: 'Closed' });
        return this.getMyAllTickets('Closed', 1, this.state.prePageRow);
      }
    }

    this.getMyAllTickets('All', 1, this.state.prePageRow);
  }

  componentDidUpdate(preProps, preState) {}

  getMyAllTickets(status, page, perPage) {
    // const { location } = this.props.history;
    MyIncidentController.incidentsWithStatus(status, page, perPage, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ spinnerState: false, totalRows: res.data.totalRows });
        // this.setState({});
        let arrtickets = [];

        // console.log("Ticket Response =>", res.data);
        if (res.data.businessObjects.length > 0) {
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

            let withdraw = getValueForFieldId(
              Incident.fields.Withdraw,
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
              withdraw,
            });
          }

          this.setState({
            tickets: arrtickets,
            arrayTickets: arrtickets,
          });
        } else {
          this.setState({ tickets: [] });
        }
      }
    });
  }

  filterTickets = (status) => {
    this.setState({
      spinnerState: true,
      defaultvalue: status,
      page: 1,
      initialPage: 1,
      forcePage: true,
    });
    this.getMyAllTickets(status, 1, this.state.prePageRow);
  };

  handlePageClick = ({ selected }) => {
    if (this.state.page === 1) {
      this.setState({ forcePage: false });
    }
    this.setState({ spinnerState: true, page: selected + 1 });
    this.getMyAllTickets(
      this.state.defaultvalue,
      selected + 1,
      this.state.prePageRow
    );
  };

  componentWillUnmount() {}

  refreshHandler = () => {
    this.setState({ tickets: [], spinnerState: true, forcePage: false });
    this.getMyAllTickets(
      this.state.defaultvalue,
      this.state.page,
      this.state.prePageRow
    );
  };

  render() {
    const {
      spinnerState,
      tickets,
      defaultvalue,
      totalRows,
      prePageRow,
    } = this.state;

    return (
      <>
        <div className='ticket-container'>
          <Row style={{ height: '100%' }}>
            <Col
              sm={12}
              md={12}
              lg={10}
              xl={10}
              className='mx-md-auto'
              style={{ height: '100%' }}
            >
              <Card
                title='My Tickets'
                total={totalRows}
                className='mb-xs-2 card-padding'
                dropdown
                globalFilterValue={this.filterTickets}
                refresh
                refreshHandler={this.refreshHandler}
                dropdownItems={filters}
                defaultvalue={defaultvalue}
                paginate={this.state.totalRows > 10}
                pageCount={Math.ceil(totalRows / prePageRow)}
                initialpage={this.state.initialPage}
                handlePageClick={this.handlePageClick}
                forcepage={this.state.forcePage ? 0 : null}
              >
                <TicketHeader
                  title='ID'
                  title2='Details'
                  title3='Status'
                  title4='Assigned To'
                  title5='Created Date & Time'
                />
                <OverflowScroll>
                  {spinnerState === true ? (
                    <div className='text-center w-100 h-100'>
                      <Spinner animation='border' size='md' color='#116eb7' />
                    </div>
                  ) : tickets.length === 0 ? (
                    <div className='d-flex align-items-center justify-content-center flex-column w-100'>
                      <img
                        alt='no-data'
                        src={Images.noincident}
                        className='img-fluid'
                      />
                      <div className='text-text-color font-weight-bold'>
                        {`No Tickets Found`}
                      </div>
                    </div>
                  ) : (
                    tickets.map((item) => (
                      <MyTicketContainer
                        key={Math.random()}
                        id={item.publicID}
                        recid={item.recId}
                        issuename={item.shortDescription}
                        issuedesc={item.description}
                        status={item.status}
                        assignedto={item.ownedBy}
                        date={item.createdDateTime}
                        service={item.service}
                        category={item.category}
                        subcat={item.subcat}
                        withdraw={item.withdraw}
                        refreshList={this.refreshHandler}
                        type={item.ticketType}
                        data={tickets}
                        location={"ticketScreen"}
                      />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MyTicketScreen;
