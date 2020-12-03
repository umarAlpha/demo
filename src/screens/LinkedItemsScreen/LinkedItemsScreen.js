import React, { Component } from 'react';
import './LinkedItemsScreen.css';
import '../../styles/globalStyle.css';

import { Images } from '../../assets/Assets';

// components
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import Spinner from 'react-bootstrap/Spinner';
import TicketHeader from '../../components/TicketHeader/TicketHeader';
import LinkedItem from './LinkedItem/LinkedItem';

import CMDB from '../../BussinessObjects/CMDB';
import cmdbLinkedItemsController from './LinkedItemsController';
import { getValueForFieldId } from '../../Utility/CommonMethods';

class LinkedItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerState: true,
      linkedItems: [],
      perPageRow: 10,
      totalRows: 0,
      page: 1,
      initialPage: 0,
    };
  }

  componentDidMount() {
    this.getAllCmdbLinkedItems(this.state.page, this.state.perPageRow);
  }

  componentDidUpdate(preProps, preState) {}

  getAllCmdbLinkedItems = (page, perPage) => {
    cmdbLinkedItemsController.getAllLinkedItems(page, perPage, (res) => {
      if (!res.success) {
        localStorage.clear();
      } else if (res.data.businessObjects.length === 0) {
        this.setState({ linkedItems: [], spinnerState: false });
      } else {
        this.setState({ totalRows: res.data.totalRows });
        let linked = [];
        if (res.data.businessObjects.length > 0) {
          res.data.businessObjects.forEach((item) => {
            let busObId = item.busObId;
            let busObRecId = item.busObRecId;
            let assetTag = getValueForFieldId(
              CMDB.fields.assetTag,
              '',
              item.fields
            );
            let type = getValueForFieldId(
              CMDB.fields.configurationItemTypeName,
              '',
              item.fields
            );
            let assetType = getValueForFieldId(
              CMDB.fields.assetType,
              '',
              item.fields
            );
            let location = getValueForFieldId(
              CMDB.fields.location,
              '',
              item.fields
            );
            let primaryUser = getValueForFieldId(
              CMDB.fields.primaryUser,
              '',
              item.fields
            );

            linked.push({
              assetTag,
              type,
              assetType,
              location,
              primaryUser,
              busObId,
              busObRecId,
            });
          });

          this.setState({ linkedItems: linked, spinnerState: false });
        }
      }
    });
  };

  handlePageClick = ({ selected }) => {
    // console.log(selected+1);
    this.setState({ spinnerState: true, page: selected + 1 });
    this.getAllCmdbLinkedItems(selected + 1, this.state.perPageRow);
    // this.getMyAllTickets(selected + 1, this.state.perPageRow);
  };

  componentWillUnmount() {}

  refreshHandler = () => {
    this.setState({ linkedItems: [], spinnerState: true });
    this.getAllCmdbLinkedItems(this.state.page, this.state.perPageRow);
  };

  render() {
    const { spinnerState, linkedItems, totalRows, perPageRow } = this.state;

    console.log('Items', linkedItems);

    return (
      <React.Fragment>
        <div className='linked-container'>
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
                title='CI items'
                total={totalRows}
                className='mb-xs-2 card-padding'
                globalFilterValue={this.filterTickets}
                refresh
                refreshHandler={this.refreshHandler}
                paginate={this.state.totalRows > 10}
                pageCount={Math.ceil(totalRows / perPageRow)}
                handlePageClick={this.handlePageClick}
                initialpage={this.state.initialPage}
              >
                <TicketHeader
                  fourthlist
                  title='Asset Tag'
                  title2='CI Type'
                  title3='Asset Type'
                  title4='Primary User'
                  title5='Location'
                />
                <OverflowScroll>
                  {spinnerState === true ? (
                    <div className='text-center w-100 h-100'>
                      <Spinner animation='border' size='md' color='#116eb7' />
                    </div>
                  ) : linkedItems.length === 0 ? (
                    <div className='d-flex align-items-center justify-content-center flex-column w-100'>
                      <img
                        alt='no-data'
                        src={Images.noincident}
                        className='img-fluid'
                      />
                      <div className='text-text-color font-weight-bold'>
                        {`No LinkedItems Found`}
                      </div>
                    </div>
                  ) : (
                    linkedItems.map((item) => (
                      <LinkedItem
                        key={item.assetTag}
                        id={item.assetTag}
                        primaryuser={item.primaryUser}
                        location={item.location}
                        type={item.type}
                        assettype={item.assetType}
                        busobid={item.busObId}
                        busobrecid={item.busObRecId}
                        data={linkedItems}
                      />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default LinkedItemsScreen;
