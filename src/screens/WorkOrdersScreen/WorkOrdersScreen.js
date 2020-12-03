import React, { Component } from 'react';
import './WorkOrdersScreen.css';
import '../../styles/globalStyle.css';

// components
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import WorkOrdersContainer from './WorkOrdersContainer/WorkOrdersContainer';
import Spinner from 'react-bootstrap/Spinner';
import WorkOrdersHeader from '../../components/TicketHeader/TicketHeader';

// controllers
import { getValueForFieldId } from '../../Utility/CommonMethods';
import WorkOrder from '../../BussinessObjects/WorkOrder';
import WorkOrdersController from './WorkOrdersController';

import { filters } from '../../assets/Data';

class WorkOrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrders: [],
      arrWorkOrders: [],
      spinnerState: true,
      totalRows: 0,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.getAllWorkOrders(1, this.state.perPage);
  }

  getAllWorkOrders(page, perPage) {
    WorkOrdersController.allOrders(page, perPage, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ spinnerState: false, totalRows: res.data.totalRows });
        let arrWorkOrders = [];

        console.log('Response =>', res);

        if (res.data.businessObjects) {
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              WorkOrder.fields.PublicID,
              '',
              res.data.businessObjects[i].fields
            );
            let description = getValueForFieldId(
              WorkOrder.fields.Description,
              '',
              res.data.businessObjects[i].fields
            );
            let title = getValueForFieldId(
              WorkOrder.fields.Title,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              WorkOrder.fields.Status,
              '',
              res.data.businessObjects[i].fields
            );
            let ownedBy = getValueForFieldId(
              WorkOrder.fields.OwnedBy,
              '',
              res.data.businessObjects[i].fields
            );
            let createdDateTime = getValueForFieldId(
              WorkOrder.fields.CreatedDateTime,
              '',
              res.data.businessObjects[i].fields
            );
            let service = getValueForFieldId(
              WorkOrder.fields.Service,
              '',
              res.data.businessObjects[i].fields
            );
            let category = getValueForFieldId(
              WorkOrder.fields.Category,
              '',
              res.data.businessObjects[i].fields
            );
            let subcat = getValueForFieldId(
              WorkOrder.fields.SubCategory,
              '',
              res.data.businessObjects[i].fields
            );
            let recId = getValueForFieldId(
              WorkOrder.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            // let location = this.props.location;
            // if(location && location.filter !== undefined){
            //   if(location.filter === "Open Tickets" && (status === "New" || status === "Assigned") ){
            //     this.setState({ tickets: [
            //         ...this.state.tickets,
            //         { publicID: public_id, description: description,
            //           shortDescription: short_description, status: status , ownedBy: ownedBy , createdDateTime: createdDateTime ,
            //           service: service , category: category , subcat: subcat , recId: recId
            //         }] });
            //   }
            //   else if(location.filter === "Close Tickets" && status === "Closed"){
            //     this.setState({ tickets: [
            //         ...this.state.tickets,
            //         { publicID: public_id, description: description,
            //           shortDescription: short_description, status: status , ownedBy: ownedBy , createdDateTime: createdDateTime ,
            //           service: service , category: category , subcat: subcat , recId: recId
            //         }] });
            //   }
            // }else{
            //   this.setState({ tickets: [
            //       ...this.state.tickets,
            //       { publicID: public_id, description: description,
            //         shortDescription: short_description, status: status , ownedBy: ownedBy , createdDateTime: createdDateTime ,
            //         service: service , category: category , subcat: subcat , recId: recId
            //       }] });
            // }

            arrWorkOrders.push({
              publicID: public_id,
              description: description,
              title: title,
              status: status,
              ownedBy: ownedBy,
              createdDateTime: createdDateTime,
              service: service,
              category: category,
              subcat: subcat,
              recId: recId,
            });
          }
          // console.log('work orders -:', arrWorkOrders);
          this.setState({
            workOrders: arrWorkOrders,
            arrWorkOrders: arrWorkOrders,
          });
        } else {
          this.setState({ workOrders: [] });
        }
      }
    });
  }

  filterTickets = (status) => {
    if (status === 'All') {
      return this.setState({
        ...this.state,
        workOrders: [...this.state.arrWorkOrders],
      });
    }

    this.setState({
      ...this.state,
      workOrders: this.state.arrWorkOrders.filter(
        (item) => item.status === status
      ),
    });
  };

  componentWillUnmount() {}

  navigationHanlder = (route) => {
    // this.props.history.push(route);
  };

  refreshHandler = () => {
    this.setState({ workOrders: [], spinnerState: true });
    this.getAllWorkOrders(1, this.state.perPage);
  };

  handlePageClick = ({ selected }) => {
    // console.log(selected+1);
    this.setState({ spinnerState: true });
    this.getAllWorkOrders(selected + 1, this.state.prePageRow);
  };


  render() {
    const { spinnerState, workOrders, totalRows, perPage } = this.state;
    // console.log(workOrders);

    return (
      <div className='ticket-container'>
        <Row>
          <Col md={10} className='mx-auto'>
            <Card
              title={`WorkOrders (${workOrders.length})`}
              className='height-29'
              dropdown
              globalFilterValue={this.filterTickets}
              refresh
              refreshHandler={this.refreshHandler}
              dropdownItems={filters}
              defaultvalue='All'
              paginate
              pageCount={Math.ceil(totalRows / perPage)}
              handlePageClick={this.handlePageClick}
            >
              <WorkOrdersHeader
                // secondlist
                title='ID'
                title2='Details'
                title3='Status'
                title4='Approver'
                title5='Created Date & Time'
              />
              <OverflowScroll>
                {spinnerState === true ? (
                  <div className='text-center w-100'>
                    <Spinner animation='border' size='md' color='#116eb7' />
                  </div>
                ) : workOrders === undefined || workOrders.length <= 0 ? (
                  <div>no data found!</div>
                ) : (
                  workOrders.map((item) => (
                    <WorkOrdersContainer
                      key={Math.random()}
                      id={item.publicID}
                      recid={item.recId}
                      issuename={item.title}
                      issuedesc={item.description}
                      status={item.status}
                      assignedto={item.ownedBy}
                      date={item.createdDateTime}
                      service={item.service}
                      category={item.category}
                      subcat={item.subcat}
                      refreshList={this.refreshHandler}
                    />
                  ))
                )}
              </OverflowScroll>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WorkOrdersScreen;
