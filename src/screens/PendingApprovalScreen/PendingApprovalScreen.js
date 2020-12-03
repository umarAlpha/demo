import React, { Component } from 'react';
import './PendingApprovalScreen.css';

import { Images } from '../../assets/Assets';

// components
import { Spinner, Row, Col } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import PendingApprovalItem from './PendingApprovalContainer/PendingApprovalContainer';
import PendingHeader from '../../components/TicketHeader/TicketHeader';

// controllors
import ApprovalController from './PendingApprovalsController';

import { getValueForFieldId } from '../../Utility/CommonMethods';
import Approval from '../../BussinessObjects/Approval';

class PendingApprovalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvals: [],
      approval: null,
      spinnerState: true,
      approvalsInformation: null,
      // search: '',
      perPageRow: 10,
      totalRows: 0,
      page: 1,
      modalShow: false,
      open: false,
    };
  }

  componentDidMount() {
    this.getMyapprovals(1, this.state.perPageRow);
  }

  componentWillUnmount() {}

  getMyapprovals(page, perPage) {
    ApprovalController.pendingApprovalPerPage(page, perPage, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ spinnerState: false, totalRows: res.data.totalRows });

        if (res.data.businessObjects) {
          let arrpen = [];
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              Approval.fields.ApprovalID,
              '',
              res.data.businessObjects[i].fields
            );
            let type = getValueForFieldId(
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
              type: type,
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

  // inputChangeHandler = (e) => {
  //   this.setState({
  //     search: e.target.value,
  //     approvals: this.state.approvals.filter(
  //       (approval) =>
  //         approval.description
  //           .toLowerCase()
  //           .indexOf(e.target.value.toLowerCase()) !== -1 ||
  //         approval.status
  //           .toLowerCase()
  //           .indexOf(e.target.value.toLowerCase()) !== -1 ||
  //         approval.ownedBy
  //           .toLowerCase()
  //           .indexOf(e.target.value.toLowerCase()) !== -1 ||
  //         approval.publicID.toString().indexOf(e.target.value.toString()) !== -1
  //     ),
  //   });
  // };

  handlePageClick = ({ selected }) => {
    this.setState({ spinnerState: true, page: selected + 1 });
    this.getMyapprovals(selected + 1, this.state.perPageRow);
  };

  refreshHandler = () => {
    this.setState({ approvals: [], spinnerState: true });
    this.getMyapprovals(this.state.page, this.state.perPageRow);
  };

  render() {
    const { approvals, spinnerState, totalRows, perPageRow} = this.state;
    // console.log('Approvals =>', approvals);
    return (
      <div className='pendingApproval'>
        <Row className='h-100'>
          <Col md={11} className='mx-auto h-100'>
            <Card
              title='Pending Approvals'
              total={totalRows}
              className='h-100'
              navigationHandler={() =>
                this.navigationHanlder('pendingApproval')
              }
              
              refreshHandler={this.refreshHandler}
              refresh
              paginate={totalRows > 10}
              pageCount={Math.ceil(totalRows / perPageRow)}
              handlePageClick={this.handlePageClick}
          
            >
              <PendingHeader
                thirdlist
                title='ID'
                title2='Details'
                title3='Status'
                title4='Approver'
                title5='Created Date & Time'
                title6='Type'
              />
              <OverflowScroll>
                {spinnerState === true ? (
                  <div className='text-center w-100 h-100'>
                    <Spinner animation='border' size='md' color='#116eb7' />
                  </div>
                ) : approvals === undefined || approvals.length <= 0 ? (
                  <div className='d-flex align-items-center justify-content-center w-100'>
                    <img
                      alt='no-data'
                      src={Images.alldone}
                      className='img-fluid'
                    />
                  </div>
                ) : (
                  <div className='h-100'>
                    {approvals.map((item) => (
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
                        deadline={item.deadLine}
                        data={approvals}
                        location={"approvalScreen"}
                        {...item}
                        refreshhandler={this.refreshHandler}
                      />
                    ))}
                  </div>
                )}
              </OverflowScroll>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PendingApprovalScreen;
