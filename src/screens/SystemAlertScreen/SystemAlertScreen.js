import React, { Component } from 'react';
import './SystemAlertScreen.css';

import { Images } from '../../assets/Assets';

import Pagination from '../../components/Pagination/Pagination';

import { Row, Col, Spinner } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import { MdRefresh } from 'react-icons/md';
// import Input from '../../components/CustomInput/CustomInput';
import AlertController from './SystemAlertSController';
import SystemAlertItem from './SystemAlertContainer/SystemAlertContainer';
import SystemAlert from '../../BussinessObjects/SystemAlert';
import {
  getValueForFieldId,
} from '../../Utility/CommonMethods';

// modal
import SystemAlertModal from './SystemAlertModal/SystemAlertModal';

class SystemAlertScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      spinnerState: true,
      alert: {},
      openAlertModal: false,
      // searchField: '',
      totalRows: 0,
      perPageRow: 6,
      page: 1,
    };
  }

  componentDidMount() {
    const { location } = this.props.history;

    if (location.state) {
      this.setState({
        alert: location.state,
        openAlertModal: true,
      });
    }

    // this.setState(
    //   {
    //     alerts: this.props.systemALerts,
    //     totalRows: this.props.systemALerts.length,
    //   },
    //   () => {
    //     if (this.state.alerts.length > 0) {
    //       this.setState({ spinnerState: false });
    //     }
    //   }
    // );
    this.getAlerts(this.state.page, this.state.perPageRow);
  }

  getAlerts(page, perPage) {
    let arrAlert = [];
    AlertController.systemAlerts(page, perPage, (res) => {

      console.log("Alerts res ==>> ",res);

      if (res.success === false) {
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ totalRows: res.data.totalRows });
        if (res.data.businessObjects) {
          for (let i = 0; i < res.data.businessObjects.length; i++) {

            let id = i;

            let recid = getValueForFieldId(
              SystemAlert.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            let public_id = getValueForFieldId(
              SystemAlert.fields.PublicID,
              '',
              res.data.businessObjects[i].fields
            );
            let description = getValueForFieldId(
              SystemAlert.fields.Description,
              '',
              res.data.businessObjects[i].fields
            );
            let short_description = getValueForFieldId(
              SystemAlert.fields.ShortDescription,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              SystemAlert.fields.Status,
              '',
              res.data.businessObjects[i].fields
            );
            let priority = getValueForFieldId(
              SystemAlert.fields.Priority,
              '',
              res.data.businessObjects[i].fields
            );
            let owned_by = getValueForFieldId(
              SystemAlert.fields.OwnedBy,
              '',
              res.data.businessObjects[i].fields
            );
            let owned_by_team = getValueForFieldId(
              SystemAlert.fields.OwnedByTeam,
              '',
              res.data.businessObjects[i].fields
            );
            let work_around = getValueForFieldId(
              SystemAlert.fields.WorkAround,
              '',
              res.data.businessObjects[i].fields
            );
            let resolution = getValueForFieldId(
              SystemAlert.fields.Resolution,
              '',
              res.data.businessObjects[i].fields
            );
            let service = getValueForFieldId(
              SystemAlert.fields.Service,
              '',
              res.data.businessObjects[i].fields
            );
            let category = getValueForFieldId(
              SystemAlert.fields.Category,
              '',
              res.data.businessObjects[i].fields
            );
            let subcat = getValueForFieldId(
              SystemAlert.fields.SubCategory,
              '',
              res.data.businessObjects[i].fields
            );
            let impact = getValueForFieldId(
              SystemAlert.fields.impact,
              '',
              res.data.businessObjects[i].fields
            );
            let urgency = getValueForFieldId(
              SystemAlert.fields.urgency,
              '',
              res.data.businessObjects[i].fields
            );

            arrAlert.push({
              id: id,
              recid: recid,
              publicID: public_id,
              description: description,
              shortDescription: short_description,
              status: status,
              priority: priority,
              owned_by: owned_by,
              work_around: work_around,
              resolution: resolution,
              service: service,
              category: category,
              subcat: subcat,
              owned_by_team:owned_by_team,
              impact: impact,
              urgency:urgency
            });
          }
          this.setState({
            alerts: arrAlert,
            spinnerState: false,
          });
          // this.props.getSystemAlerts(this.state.alerts);
        } else {
          this.setState({ alerts: [], spinnerState: false });
        }
      }
    });
    // callback(this.state.arrAlert);
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentDidUpdate(preProps, preState) {}

  // inputChangeHandler = (e) => {
  //   let value = e.target.value;
  //   if (/\S/.test(value)) {
  //     // string is not empty and not just whitespace
  //     this.setState({ searchField: value });
  //   } else {
  //     this.setState({ searchField: '' });
  //   }
  // };

  handlePageClick = ({ selected }) => {
    // console.log(selected+1);
    this.setState({ spinnerState: true, page: selected + 1 });
    this.getAlerts(selected + 1, this.state.prePageRow);
  };

  refreshHandler = () => {
    this.setState({ alerts: [], spinnerState: true });
    this.getAlerts(this.state.page, this.state.perPageRow);
    // setTimeout(() => {
    //   this.setState({ alerts: this.props.systemALerts });
    // }, [1500]);
    // this.getAnnouncements();
    // this.getSurveys();
  };

  render() {
    const { alerts, spinnerState } = this.state;
    const { openAlertModal, alert, totalRows, perPageRow } = this.state;
    // console.log('Alerts', alerts);
    return (
      <>
        <Row>
          <Col md={10} className='mx-auto'>
            <div className='d-flex align-items-center mb-3'>
              <h5 className='alert-heading mb-3'>
                System Alerts{' '}
                <span className='d-inline-block text-text-color'>
                  ({totalRows})
                </span>
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={this.refreshHandler}
                  className='ml-2'
                >
                  <MdRefresh size={26} />
                </i>
              </h5>
              {/* <div className='d-flex align-items-center'> */}
              {/* <Input
                  placeholder='Search'
                  className='input'
                  inputStyle='input'
                  value={searchField}
                  onChange={this.inputChangeHandler}
                /> */}
              {/* </div> */}
            </div>
            <div
              style={{ overflowY: 'auto', overflowX: 'hidden' }}
              className='height-24 over'
            >
              <Row className='right-margin'>
                {spinnerState ? (
                  <div className='text-center w-100'>
                    <Spinner animation='border' size='md' variant='primary' />
                  </div>
                ) : alerts.length === 0 ? (
                  <div className='d-flex align-items-center justify-content-center w-100'>
                    <img
                      alt='no-data'
                      src={Images.alldone}
                      className='img-fluid'
                    />
                  </div>
                ) : (
                  alerts.map((item, index) => (
                    <Col xl={6} lg={6} md={12} sm={12} key={item.publicID}>
                      <Card className=''>
                        <SystemAlertItem
                          key={index}
                          shortDescription={item.shortDescription}
                          description={item.description}
                          data={alerts}
                          {...item}
                        />
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
            {totalRows > 6 && (
              <div className='text-right'>
                <Pagination
                  pageCount={Math.ceil(totalRows / perPageRow)}
                  handlePageClick={this.handlePageClick}
                />
              </div>
            )}
          </Col>
        </Row>
        {alert ? (
          <SystemAlertModal
            show={openAlertModal}
            onHide={() => this.setState({ openAlertModal: false })}
            {...alert}
          />
        ) : null}
      </>
    );
  }
}

export default SystemAlertScreen;
