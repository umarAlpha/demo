import React, { Component } from 'react';
import './SearchScreen.css';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import ComaroundContainer from '../ComaroundScreen/ComaroundContainer/ComaroundContainer';
import MyTicketContainer from '../../screens/MyTicketsScreen/MyTicketContainer/MyTicketContainer'

// assets
import { Images } from '../../assets/Assets';

// controllers
import incidentController from '../MyTicketsScreen/MyIncidentController';
// import workOrderController from '../WorkOrdersScreen/WorkOrdersController';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import Incident from '../../BussinessObjects/Incident';
// import WorkOrder from '../../BussinessObjects/WorkOrder';

import ComController from '../ComaroundScreen/ComAroundController';
import LoginController from '../../screens/LoginScreen/CustomerLoginController';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incident: [],
      search: '',
      // workorders: [],
      comarounds: [],
      spinner: true,
      spinner2: true,
      // totalRows: 0,
      // totalRows2: 0,
      // spinnerState: true,
      error: false,
      error2: false,
      pageIncident: 1,
      incidentPerPage: 10,
      pageComaround: 1,
      comaroundPerPage: 10,
      totalIncident: 0,
      totalComaround: 0,
      // error2: false,
      //   searchText: ''
    };
  }

  componentDidMount() {
    // console.log('Ticket', location.state.ticket);

    // if (location.state) {
    //   if (location.state.text) {
    //     // console.log('Status', location.state.text);
    //     // this.setState({
    //     //   ticket: location.state.ticket,
    //     //   modalShow1: true,
    //     //   rerender: true,
    //     // });
    //   }
    // }
    if (this.props.history.location) {
      if (this.props.history.location.state) {
        let value = this.props.history.location.state.text;
        this.setState({ search: value });
        this.getIncidentBySearch(
          this.state.pageIncident,
          this.state.incidentPerPage,
          value
        );
        // this.getWorkOdersBySearch(value);
        this.getListWithSearchFilter(
          value,
          'MostViewed',
          this.state.pageComaround,
          this.state.comaroundPerPage
        );
      }
    }
  }
  componentDidUpdate() {}
  componentWillUnmount() {}

  getIncidentBySearch = (page, perPage, text) => {
    incidentController.allIncidentsBySearchText(
      page,
      perPage,
      text,
      (response) => {
        if (!response.success) {
          this.setState({ error2: true, spinner2: false });
        } else {
          let arr = [];
          if (response.data.businessObjects.length === 0) {
            this.setState({ error2: true, spinner2: false });
          }
          // console.log("Response incident =>", response);
          if (response.data.businessObjects.length > 0) {
            this.setState({ totalIncident: response.data.totalRows });
            // this.setState({totalRows: response.data.totalRows});
            response.data.businessObjects.find((item, index) => {
              let public_id = getValueForFieldId(
                Incident.fields.PublicID,
                '',
                item.fields
              );
              let description = getValueForFieldId(
                Incident.fields.Description,
                '',
                item.fields
              );
              let short_description = getValueForFieldId(
                Incident.fields.ShortDescription,
                '',
                item.fields
              );
              let status = getValueForFieldId(
                Incident.fields.Status,
                '',
                item.fields
              );
              let ownedBy = getValueForFieldId(
                Incident.fields.OwnedBy,
                '',
                item.fields
              );
              let createdDateTime = getValueForFieldId(
                Incident.fields.CreatedDateTime,
                '',
                item.fields
              );
              let service = getValueForFieldId(
                Incident.fields.Service,
                '',
                item.fields
              );
              let category = getValueForFieldId(
                Incident.fields.Category,
                '',
                item.fields
              );
              let subcat = getValueForFieldId(
                Incident.fields.SubCategory,
                '',
                item.fields
              );
              let recId = getValueForFieldId(
                Incident.fields.RecID,
                '',
                item.fields
              );

              arr.push({
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
            });
            this.setState({ incident: arr, spinner2: false });
          }
        }
        // return;
      }
    );
  };

  // getWorkOdersBySearch = (text) => {
  //   workOrderController.allOrdersByText('', (response) => {
  //     console.log(response)
  //     if (!response.success) {
  //       this.setState({ error: true });
  //     } else {
  //       let arr = [];
  //       if (response.data.businessObjects.length === 0) {
  //         this.setState({ error2: true, spinner2: false });
  //       }
  //       if (response.data.businessObjects.length > 0) {
  //         response.data.businessObjects.find((item, index) => {
  //           let public_id = getValueForFieldId(
  //             WorkOrder.fields.PublicID,
  //             '',
  //             item.fields
  //           );
  //           let description = getValueForFieldId(
  //             WorkOrder.fields.Description,
  //             '',
  //             item.fields
  //           );
  //           let title = getValueForFieldId(
  //             WorkOrder.fields.Title,
  //             '',
  //             item.fields
  //           );
  //           let status = getValueForFieldId(
  //             WorkOrder.fields.Status,
  //             '',
  //             item.fields
  //           );
  //           let ownedBy = getValueForFieldId(
  //             WorkOrder.fields.OwnedBy,
  //             '',
  //             item.fields
  //           );
  //           let createdDateTime = getValueForFieldId(
  //             WorkOrder.fields.CreatedDateTime,
  //             '',
  //             item.fields
  //           );
  //           let service = getValueForFieldId(
  //             WorkOrder.fields.Service,
  //             '',
  //             item.fields
  //           );
  //           let category = getValueForFieldId(
  //             WorkOrder.fields.Category,
  //             '',
  //             item.fields
  //           );
  //           let subcat = getValueForFieldId(
  //             WorkOrder.fields.SubCategory,
  //             '',
  //             item.fields
  //           );
  //           let recId = getValueForFieldId(
  //             WorkOrder.fields.RecID,
  //             '',
  //             item.fields
  //           );

  //           arr.push({
  //             publicID: public_id,
  //             description: description,
  //             title: title,
  //             status: status,
  //             ownedBy: ownedBy,
  //             createdDateTime: createdDateTime,
  //             service: service,
  //             category: category,
  //             subcat: subcat,
  //             recId: recId,
  //           });
  //         });
  //         this.setState({ workorders: arr, spinner2: false });
  //       }
  //     }
  //   });
  // };

  getListWithSearchFilter = (searchValue, filter, page, perPage) => {
    // if (!localStorage.getItem('authToken_comaround')) {
    LoginController.comaroundLogin();
    // }

    ComController.getSearchArticlesWithFilterPerPage(
      searchValue,
      filter,
      page,
      perPage,
      (res) => {
        if (res.success === false) {
          this.setState({ error: true, spinner: false });
        } else {
          if (res.data.result.length === 0) {
            this.setState({ error: true, spinner: false });
          } else if (res.data.result.length > 0) {
            this.setState({
              comarounds: res.data.result,
              spinner: false,
              error: false,
              totalComaround: res.data.totalResultCount,
            });
          }
        }
      }
    );
  };

  handlePageClickComaround = ({ selected }) => {
    this.setState({ spinner: true, pageComaround: selected + 1 });
    this.getListWithSearchFilter(
      this.state.search,
      'MostViewed',
      selected + 1,
      this.state.comaroundPerPage
    );
  };

  handlePageClickIncident = ({ selected }) => {
    console.log(selected);
    this.setState({ spinner2: true, pageIncident: selected + 1 });
    this.getIncidentBySearch(
      selected + 1,
      this.state.incidentPerPage,
      this.state.search
    );
  };

  refreshHandler = () => {
    this.setState({ spinner: true, comarounds: [] });
    this.getListWithSearchFilter(
      this.state.search,
      'MostViewed',
      this.state.pageComaround,
      this.state.comaroundPerPage
    );
  };

  render() {
    const {
      incident,
      // workorders,
      comarounds,
      spinner,
      spinner2,
      error,
      error2,
      search,
      totalIncident,
      totalComaround,
      incidentPerPage,
      comaroundPerPage,
    } = this.state;
    // console.log('Incident', comarounds);
    console.log('Total incidents =>', totalIncident);

    return (
      <div className='search-container'>
        <Container fluid>
          <Row>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0'
            >
              <Card
                title='Comaround'
                className='height-29 pb-1'
                paginate={totalComaround > 10}
                pageCount={Math.ceil(totalComaround / comaroundPerPage)}
                handlePageClick={this.handlePageClickComaround}
              >
                <OverflowScroll>
                  {spinner ? (
                    <div className='text-center w-100 height-25'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : error ? (
                    <div className='text-center height-25'>
                      <div
                        style={{
                          height: 'inherit',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {/* <span style={{ alignSelf: 'center' }}>No Data Available</span> */}
                        <img
                          src={Images.noknowledge}
                          alt='not-found'
                          className='img-fluid'
                        />
                        <div className='text-text-color font-weight-bold'>
                          No Articles Found with this keyword{' '}
                          <span
                            className='text-dark'
                            style={{ fontSize: '1.2rem' }}
                          >
                            {search}
                          </span>{' '}
                          Please try another keyword.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='height-25'>
                      {comarounds.map((item) => (
                        <ComaroundContainer
                          list={item}
                          key={item.id}
                          data={comarounds}
                          refreshHandler={this.refreshHandler}
                        />
                      ))}
                    </div>
                  )}
                </OverflowScroll>
              </Card>
            </Col>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0'
            >
              <Card
                title='Incident'
                className='height-29 pb-1'
                paginate={totalIncident > 10}
                pageCount={Math.ceil(totalIncident / incidentPerPage)}
                handlePageClick={this.handlePageClickIncident}
              >
                <OverflowScroll>
                  {spinner2 ? (
                    <div className='text-center w-100 height-25'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : error2 ? (
                    <div className='text-center height-25'>
                      <div
                        style={{
                          height: 'inherit',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {/* <span style={{ alignSelf: 'center' }}>No Data Available</span> */}
                        <img
                          src={Images.noincident}
                          alt='not-found'
                          className='img-fluid'
                        />
                        <div className='text-text-color font-weight-bold'>
                          No Tickets Found with this keyword{' '}
                          <span
                            className='text-dark'
                            style={{ fontSize: '1.2rem' }}
                          >
                            {search}
                          </span>{' '}
                          Please try another keyword.
                        </div>

                        {/* <img
                          style={{ alignSelf: 'center' }}
                          alt='no-data'
                          src={Images.nodata}
                          width='250px'
                        /> */}
                      </div>
                    </div>
                  ) : (
                    <div className='height-25'>
                      {incident.map((item, index) => (
                        <MyTicketContainer
                              key={Math.random()}
                              id={item.publicID}
                              publicid={item.publicID}
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
                              ticketType={item.ticketType}
                              data={incident}
                              location={"search"}
                            />
                      ))}
                    </div>
                  )}
                </OverflowScroll>
              </Card>
            </Col>
            {/* <Col
              xl={4}
              lg={4}
              md={4}
              sm={12}
              className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0'
            >
              <Card title='Work Orders' className='height-29'>
                <OverflowScroll>
                  {spinner2 ? (
                    <div className='text-center w-100'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : error2 ? (
                    <div className='text-center'>
                      <div
                        style={{
                          height: '40vh',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt='no-data'
                          src={require('../../assets/images/undraw_empty.png')}
                          width='150px'
                        />
                        <p>Sorry troubleshoting</p>
                      </div>
                    </div>
                  ) : (
                    workorders.map((item, index) => (
                      <Accordion
                        titleStyle='text-text-color'
                        title={item.title}
                        description={item.description}
                        paragraphStyle='paragraph'
                        key={index}
                      />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default SearchScreen;
