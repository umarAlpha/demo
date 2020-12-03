import React, { Component, Fragment } from 'react';
import './SurveyScreen.css';

import Pagination from '../../components/Pagination/Pagination';

import { Images } from '../../assets/Assets';

import { Row, Col, Spinner } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';
import Card from '../../components/CustomCard/CustomCard';
import SurveyContainer from './SurveyContainer/SurveyContainer';

import SurveyController from './SurveyController';

import { getValueForFieldId } from '../../Utility/CommonMethods';
import Survey from '../../BussinessObjects/Survey';

export default class SurveysScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      loading: true,
      totalRows: 0,
      perPageRow: 6,
      page: 1,
    };
  }

  componentDidMount() {
    this.getSurveys(1, this.state.perPageRow);
  }
  componentWillUnmount() {}

  getSurveys = (page, perPage) => {
    SurveyController.systemSurveysPerPage(page, perPage, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        this.setState({ loading: false, totalRows: res.data.totalRows });
        let surveyarr = [];

        if (res.data.businessObjects) {
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let title = getValueForFieldId(
              Survey.fields.ParentShortDescription,
              '',
              res.data.businessObjects[i].fields
            );
            let description = getValueForFieldId(
              Survey.fields.ParentRecordDescription,
              '',
              res.data.businessObjects[i].fields
            );
            let ParentPublicID = getValueForFieldId(
              Survey.fields.ParentPublicID,
              '',
              res.data.businessObjects[i].fields
            );
            let RecID = getValueForFieldId(
              Survey.fields.RecID,
              '',
              res.data.businessObjects[i].fields
            );

            let ParentRecID = getValueForFieldId(
              Survey.fields.ParentRecID,
              '',
              res.data.businessObjects[i].fields
            );

            surveyarr.push({
              description,
              title,
              parentpublicid: ParentPublicID,
              recId: RecID,
              ParentRecID,
            });
          }

          this.setState({
            surveys: surveyarr,
          });
        } else {
          this.setState({ surveys: [] });
        }
      }
    });
  };

  handlePageClick = ({ selected }) => {
    // console.log(selected+1);
    this.setState({ loading: true, page: selected + 1 });
    this.getSurveys(selected + 1, this.state.perPageRow);
  };

  refreshHandler = () => {
    this.setState({ surveys: [], loading: true });
    this.getSurveys(this.state.page, this.state.perPageRow);
  };

  render() {
    const { loading, surveys, totalRows, perPageRow } = this.state;
    return (
      <Fragment>
        <Row className='h-100'>
          <Col md={10} className='mx-auto h-100'>
            {/* <div> */}
            <div className='d-flex align-items-center mb-2'>
              {/* <div className=''> */}
              <span className='d-inline-block survey-heading'>
                Surveys{' '}
                <span className='text-text-color font-weight-bold'>
                  ({totalRows})
                </span>
              </span>
              <i
                className='d-inline-block ml-2'
                style={{ cursor: 'pointer' }}
                onClick={this.refreshHandler}
              >
                <MdRefresh size={28} color='#16344e' />
              </i>
              {/* </div> */}
            </div>
            {/* </div> */}
            <div
              style={{ overflowY: 'auto', overflowX: 'hidden', height: '80%' }}
              className='over'
            >
              <Row>
                {loading === true ? (
                  <div className='text-center w-100'>
                    <Spinner animation='border' size='md' color='#116eb7' />
                  </div>
                ) : surveys === undefined || surveys.length <= 0 ? (
                  <div className='d-flex align-items-center justify-content-center w-100'>
                    <img
                      alt='no-data'
                      src={Images.alldone}
                      className='img-fluid'
                    />
                    
                  </div>
                ) : (
                  this.state.surveys.map((item) => (
                    <Col xl={6} lg={6} md={12} sm={12} key={Math.random()} className='mb-3'>
                      <Card>
                        <SurveyContainer 
                          {...item}
                          data = {surveys}
                          refreshhandler={this.refreshHandler}
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
      </Fragment>
    );
  }
}
