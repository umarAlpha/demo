import React, { Component } from 'react';
import './ComaroundScreen.css';

import { Images } from '../../assets/Assets';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import ComaroundContainer from './ComaroundContainer/ComaroundContainer';

// controllers
import ComController from './ComAroundController';
import LoginController from '../../screens/LoginScreen/CustomerLoginController';

class ComaroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostpopular: [],
      // recommended: [],
      news: [],
      spinnerState: true,
      // spinnerState2: true,
      spinnerState3: true,
    };
  }

  componentDidMount() {
    const {
      location: { state },
    } = this.props;

    if (
      localStorage.getItem('authToken_comaround') &&
      state !== null &&
      state !== undefined
    ) {
      // let res = LoginController.comaroundLogin();
      this.getListWithSearchFilter(state.globalSearch, 'MostViewed');
      // this.getListWithSearchFilter(state.globalSearch, 'MostHelpful');
      this.getListWithSearchFilter(state.globalSearch, 'RecentlyAdded');
    } else if (!localStorage.getItem('authToken_comaround')) {
      LoginController.comaroundLogin((res) => {
        if (res === true) {
          this.setState({
            spinnerState: true,
            spinnerState2: true,
            spinnerState3: true,
          });
          this.getListWithSearchFilter(state.globalSearch, 'MostViewed');
          // this.getListWithSearchFilter(state.globalSearch, 'MostHelpful');
          this.getListWithSearchFilter(state.globalSearch, 'RecentlyAdded');
        } else {
          this.getList('MostViewed');
          // this.getList('MostHelpful');
          this.getList('RecentlyAdded');
        }
      });
    } else {
      // LoginController.comaroundLogin((response) => console.log("Comres =>", response));
      this.getList('MostViewed');
      // this.getList('MostHelpful');
      this.getList('RecentlyAdded');
      // this.setState({ spinnerState: false });
    }
  }
  componentDidUpdate() {}
  componentWillUnmount() {}

  getListWithSearchFilter = (searchValue, filter) => {
    ComController.getSearchArticlesWithFilter(searchValue, filter, (res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        if (res.data.result === undefined) {
          return null;
        } else if (res.data.result.length > 0) {
          // console.log(res.data.result);
          if (filter === 'MostViewed') {
            this.setState({
              mostpopular: res.data.result,
              spinnerState: false,
            });
          }
          // if (filter === 'MostHelpful') {
          //   this.setState({
          //     recommended: res.data.result,
          //     spinnerState2: false,
          //   });
          // }
          if (filter === 'RecentlyAdded') {
            this.setState({
              news: res.data.result,
              spinnerState3: false,
            });
          }
        } else {
          this.setState({
            mostpopular: [],
            // recommended: [],
            news: [],
            spinnerState: false,
            // spinnerState2: false,
            spinnerState3: false,
          });
        }
      }
    });
  };

  getList(filter) {
    // this.setState({ filter: filter });
    if (filter === 'MostViewed') {
      ComController.getSearchArticles(filter, (res) => {
        if (res.success === false) {
          // console.log('response =>', res);
          localStorage.clear();
          this.props.history.push('/login');
        } else {
          this.setState({ mostpopular: res.data.result, spinnerState: false });
        }
      });
    } else if (filter === 'MostHelpful') {
      ComController.getSearchArticles(filter, (res) => {
        if (res.success === false) {
          localStorage.clear();
        } else {
          this.setState({ recommended: res.data.result, spinnerState2: false });
        }
      });
    } else if (filter === 'RecentlyAdded') {
      ComController.getSearchArticles(filter, (res) => {
        if (res.success === false) {
          localStorage.clear();
        } else {
          this.setState({ news: res.data.result, spinnerState3: false });
        }
      });
    }
  }

  // filterList = (val) => {
  //   if (val === 'Relevance') {
  //     this.getList('MostRelevant');
  //   } else if (val === 'Resolution Rate') {
  //     this.getList('MostHelpful');
  //     this.setState({ filter: 'MostHelpful' });
  //   } else if (val === 'Latest') {
  //     this.getList('RecentlyAdded');
  //   } else {
  //     this.getList('MostViewed');
  //   }
  // };

  refreshHandler = () => {
    this.setState({ spinnerState: true, spinnerState3: true });
    this.getList('MostViewed');
    this.getList('RecentlyAdded');
  };

  render() {
    const {
      mostpopular,
      // recommended,
      news,
      spinnerState,
      spinnerState3,
    } = this.state;

    return (
      <div className='comaroundContainer'>
        {/* <h5 className='survey-heading mb-3'>Comaround</h5> */}
        <Container fluid className='h-100'>
          <Row className='h-100'>
            <Col xl={6} lg={6} md={6} sm={12} className='mb-2 h-100'>
              <Card title='Most Popular' className='h-100'>
                <OverflowScroll>
                  {spinnerState ? (
                    <div className='text-center w-100'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : mostpopular.length === 0 ? (
                    <div className='text-center'>
                      <div
                        style={{
                          // height: '40vh',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt='no-data'
                          style={{ flex: '1' }}
                          src={Images.noknowledge}
                          // width='150px'
                          className='img-fluid'
                        />
                        {/* <p>Sorry troubleshoting</p> */}
                      </div>
                    </div>
                  ) : (
                    mostpopular.map((item) => (
                      <ComaroundContainer
                        list={item}
                        key={item.id}
                        data={mostpopular}
                        refreshHandler={this.refreshHandler}
                      />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col>
            {/* <Col
              xl={4}
              lg={4}
              md={6}
              sm={12}
              className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0'
            >
              <Card title='Recommended' className='height-29'>
                <OverflowScroll>
                  {spinnerState2 ? (
                    <div className='text-center w-100'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : mostpopular.length === 0 ? (
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
                    recommended.map((item) => (
                      <ComaroundContainer {...item} key={item.id} />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col> */}
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0 h-100'
            >
              <Card title='News' className='h-100'>
                <OverflowScroll>
                  {spinnerState3 ? (
                    <div className='text-center w-100'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : mostpopular.length === 0 ? (
                    <div className='text-center'>
                      <div
                        style={{
                          // height: '40vh',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt='no-data'
                          style={{ flex: '1' }}
                          src={Images.noknowledge}
                          // width='150px'
                          className='img-fluid'
                        />
                        {/* <p>Sorry troubleshoting</p> */}
                      </div>
                    </div>
                  ) : (
                    news.map((item) => (
                      <ComaroundContainer
                        list={item}
                        key={item.id}
                        data={news}
                        refreshHandler={this.refreshHandler}
                      />
                    ))
                  )}
                </OverflowScroll>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ComaroundScreen;
