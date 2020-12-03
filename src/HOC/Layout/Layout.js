import React, { Component } from 'react';
import './Layout.css';
import { Images } from '../../assets/Assets';
// context
import UserContext from '../../ContextApi/UserInfoContext/context';

// components
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderTicket from '../../components/HeaderTicket/HeaderTicket';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/CustomCard/CustomCard';
import OverflowScroll from '../../components/OverflowScroll/OverflowScroll';
import ComaroundContainer from '../../screens/ComaroundScreen/ComaroundContainer/ComaroundContainer';

// containers
import HeaderSearch from '../../containers/HeaderSearch/HeaderSearch';

// controllers and models
import AnnouncementController from '../../screens/AnnouncementScreen/AnnouncementController';
import Accouncements from '../../BussinessObjects/Announcement';
import {
  getValueForFieldId,
  sessionMaintain,
} from '../../Utility/CommonMethods';
import ComController from '../../screens/ComaroundScreen/ComAroundController';
import LoginController from '../../screens/LoginScreen/CustomerLoginController';
import layoutController from './LayoutController';

class Layout extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      helpFulArtciles: [],
      globalSearchFilter: 'Helpful Article',
      spinner: true,
      globalSearch: '',
      showSuggestions: false,
      suggestions: [],
      spinnerSuggestion: true,
      totalRows: 0,
      perPage: 6,
      isOpen: false,
      helpFulArtcilesError: false,
    };
  }

  componentDidMount() {
    // this.getAlerts(1, this.state.perPage);
    if (this.props.isLogin) {
      const { getUserInfomation } = this.context;
      getUserInfomation();
      this.getAnnouncements();
      this.getHelpFulArticles('MostHelpful');
    }
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.isLogin !== this.props.isLogin) {
      const { getUserInfomation } = this.context;
      getUserInfomation();
      this.getAnnouncements();
      this.getHelpFulArticles('MostHelpful');
    }
  }

  clearSearch = () => {
    this.setState({ globalSearch: '' });
  };

  getAnnouncements = () => {
    AnnouncementController.announcements((res) => {
      if (res.success === false) {
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        if (res.data.businessObjects) {
          let arrpen = [];
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let public_id = getValueForFieldId(
              Accouncements.fields.AnnouncementId,
              '',
              res.data.businessObjects[i].fields
            );
            let subject = getValueForFieldId(
              Accouncements.fields.AnnouncementSubject,
              '',
              res.data.businessObjects[i].fields
            );
            let comment = getValueForFieldId(
              Accouncements.fields.AnnouncementComment,
              '',
              res.data.businessObjects[i].fields
            );
            let status = getValueForFieldId(
              Accouncements.fields.AnnouncementLastModDate,
              '',
              res.data.businessObjects[i].fields
            );
            let lastDate = getValueForFieldId(
              Accouncements.fields.AnnouncementLastModDate,
              '',
              res.data.businessObjects[i].fields
            );

            arrpen.push({
              publicID: public_id,
              subject,
              comment,
              status,
              lastDate,
            });
          }
          this.setState({
            alerts: arrpen,
          });
        } else {
          this.setState({ alerts: [] });
        }
      }
    });
  };

  // getAlerts(page, perPage) {
  //   let arrAlert = [];
  //   AlertController.systemAlerts(page, perPage, (res) => {
  //     if (res.success === false) {
  //       localStorage.clear();
  //       sessionStorage.clear();
  //     } else {
  //       if (res.data.businessObjects) {
  //         for (let i = 0; i < res.data.businessObjects.length; i++) {
  //           let public_id = getValueForFieldId(
  //             SystemAlert.fields.PublicID,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let description = getValueForFieldId(
  //             SystemAlert.fields.Description,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let short_description = getValueForFieldId(
  //             SystemAlert.fields.ShortDescription,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let status = getValueForFieldId(
  //             SystemAlert.fields.Status,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let priority = getValueForFieldId(
  //             SystemAlert.fields.Priority,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let owned_by = getValueForFieldId(
  //             SystemAlert.fields.OwnedBy,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let work_around = getValueForFieldId(
  //             SystemAlert.fields.WorkAround,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let resolution = getValueForFieldId(
  //             SystemAlert.fields.Resolution,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let service = getValueForFieldId(
  //             SystemAlert.fields.Service,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let category = getValueForFieldId(
  //             SystemAlert.fields.Category,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );
  //           let subcat = getValueForFieldId(
  //             SystemAlert.fields.SubCategory,
  //             '',
  //             res.data.businessObjects[i].fields
  //           );

  //           arrAlert.push({
  //             publicID: public_id,
  //             description: description,
  //             shortDescription: short_description,
  //             status: status,
  //             priority: priority,
  //             owned_by: owned_by,
  //             work_around: work_around,
  //             resolution: resolution,
  //             service: service,
  //             category: category,
  //             subcat: subcat,
  //           });
  //         }
  //         this.setState({
  //           alerts: arrAlert,
  //         });
  //         this.props.getSystemAlerts(this.state.alerts);
  //       } else {
  //         this.setState({ alerts: [] });
  //       }
  //     }
  //   });
  //   // callback(this.state.arrAlert);
  // }

  getHelpFulArticles = (filter) => {
    LoginController.comaroundLogin((res) => {
      if (res) {
        // setTimeout(() => {
          ComController.getSearchArticles(filter, (res) => {
            if (!res.success) {
              this.setState({ helpFulArtcilesError: true });
            } else {
              this.setState({
                helpFulArtciles: res.data.result,
                spinner: false,
              });
            }
          });
        // }, [2000]);
      }
    });
  };

  refreshHandler = () => {
    this.setState({ spinner: true, helpFulArtcilesError: false });
    LoginController.comaroundLogin((res) => {
      if (res) {
        this.getHelpFulArticles('MostHelpful');
      }
    });
  };

  logoutHandler = () => {
    layoutController.LogoutProcessed((res) => {
      sessionMaintain(this.props.history);
    });
  };

  getSuggestions = (value) => {
    ComController.getGlobalSuggestions(value, (res) => {
      this.setState({
        suggestions: res.data.suggestions,
        spinnerSuggestion: false,
      });
    });
  };

  profileRouteHandler = () => {
    this.props.history.push('/profile');
  };

  selectionHandler = (value) => {
    if (value !== '' || this.state.globalSearchFilter !== '') {
      if (this.state.globalSearchFilter === 'Helpful Article') {
        this.props.history.push({
          pathname: '/search',
          state: {
            text: value,
            // globalSearchFilter: this.state.globalSearchFilter,
          },
        });
        this.setState({ globalSearch: value, showSuggestions: false });
      }
    } else {
      return;
    }
  };

  inputChangeHandler = (e) => {
    let value = e.target.value;
    if (/\S/.test(value)) {
      // string is not empty and not just whitespace
      this.setState({
        showSuggestions: true,
        globalSearch: value,
        // clearSearch: true,
      });
      this.getSuggestions(value);
    } else {
      this.setState({
        globalSearch: '',
        showSuggestions: false,
        // clearSearch: false,
      });
    }
  };

  searchPressHandler = (e) => {
    if (e.key === 'Enter') {
      if (
        this.state.globalSearch !== '' ||
        this.state.globalSearchFilter !== ''
      ) {
        if (this.state.globalSearchFilter === 'Helpful Article') {
          this.setState({ showSuggestions: false });
          this.props.history.push({
            pathname: '/search',
            state: {
              text: this.state.globalSearch,
            },
          });
        }
      } else {
        return;
      }
    }
  };

  closeDropdown = () => {
    this.setState({
      globalSearch: '',
      suggestions: [],
      showSuggestions: false,
      spinnerSuggestion: true,
    });
  };

  // && this.props.location.pathname !== '/comaround'

  render() {
    const {
      helpFulArtciles,
      spinner,
      globalSearch,
      suggestions,
      showSuggestions,
      spinnerSuggestion,
      helpFulArtcilesError,
    } = this.state;
    // console.log("Login", this.props.isLogin);

    if (this.props.isLogin) {
      return (
        <React.Fragment>
          <div className='d-flex' id='layout'>
            <Sidebar
              isopen={this.state.isOpen}
              clearSearch={this.clearSearch}
              hide={() => this.setState({ isOpen: false })}
            />
            <div className='layout__children'>
              <HeaderTicket
                navbarShowHandlder={() => {
                  this.setState({ isOpen: true });
                }}
                systemAlerts={this.state.alerts}
                logoutHandler={this.logoutHandler}
                profileRouteHandler={this.profileRouteHandler}
              />
              <HeaderSearch
                history={this.props.history}
                globalSearch={globalSearch}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                spinnerSuggestion={spinnerSuggestion}
                inputChangeHandler={this.inputChangeHandler}
                searchPressHandler={this.searchPressHandler}
                selectionHandler={this.selectionHandler}
                globalSearchFilter={this.state.globalSearchFilter}
                closeDropdown={this.closeDropdown}
              />
              <div
                style={{
                  height: '55%',
                  overflowY: 'auto',
                  backgroundColor: 'rgb(231, 231, 231)',
                }}
              >
                {this.props.location.pathname !== '/profile' ? (
                  <div className='custom-container'>
                    <Container fluid style={{ height: '100%' }}>
                      <Row style={{ height: '100%' }}>
                        <Col
                          xl={this.props.location.pathname === '/home' ? 8 : 12}
                          lg={this.props.location.pathname === '/home' ? 8 : 12}
                          md={
                            this.props.location.pathname === '/home' ? 12 : 12
                          }
                          sm={
                            this.props.location.pathname === '/home' ? 12 : 12
                          }
                          className='mb-sm-4 mb-xs-4 mb-md-0 mb-lg-0'
                          style={{ height: '100%' }}
                        >
                          {this.props.children}
                        </Col>
                        {this.props.location.pathname === '/home' && (
                          <Col xl={4} lg={4} md={12} sm={12} className='h-100'>
                            <Card
                              title='Helpful Articles'
                              className='h-100'
                              refreshHandler={this.refreshHandler}
                              refresh
                            >
                              <OverflowScroll>
                                <>
                                  {spinner === true ? (
                                    <div className='w-100 text-center h-100'>
                                      <Spinner
                                        animation='border'
                                        size='md'
                                        variant='primary'
                                      />
                                    </div>
                                  ) : helpFulArtcilesError ? (
                                    <div className='d-flex align-items-center justify-content-center flex-column w-100 h-100'>
                                      <img
                                        alt='no-data'
                                        src={Images.noincident}
                                        className='img-fluid'
                                      />
                                      <div className='text-text-color font-weight-bold'>
                                        Please Refresh Try Aagin
                                      </div>
                                    </div>
                                  ) : (
                                    helpFulArtciles.map((article) => (
                                      <ComaroundContainer
                                        key={article.id}
                                        list={article}
                                        data={helpFulArtciles}
                                        title={
                                          article.title.substr(0, 50) + '...'
                                        }
                                        titleStyle='title'
                                        icon
                                        {...article}
                                        refreshHandler={this.refreshHandler}
                                      />
                                    ))
                                  )}
                                </>
                              </OverflowScroll>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </Container>
                  </div>
                ) : (
                  <>{this.props.children}</>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}

export default Layout;

// getComaroundArticles() {
//   if (localStorage.getItem('authToken_comaround')) {
//     this.getHelpFulArticles('MostHelpful');
//   } else {
//     LoginController.comaroundLogin();
//     this.getHelpFulArticles('MostHelpful', () => {
//     this.setState({ spinner: false });
//     });
//   }
// }

// if (this.state.globalSearchFilter === 'All Tickets') {
//   this.props.history.replace({
//     pathname: '/myticket',
//     state: {
//       globalSearch: value,
//       globalSearchFilter: this.state.globalSearchFilter,
//     },
//   });
//   this.setState({ globalSearch: '', showSuggestions: false });
// }
// if (this.state.globalSearchFilter === 'WorkOrders') {
//   this.props.history.replace({
//     pathname: '/workorders',
//     state: {
//       globalSearch: this.state.globalSearch,
//       globalSearchFilter: this.state.globalSearchFilter,
//     },
//   });
// }

// if (this.state.globalSearchFilter === 'All Tickets') {
//   this.props.history.replace({
//     pathname: '/myticket',
//     state: {
//       globalSearch: this.state.globalSearch,
//       globalSearchFilter: this.state.globalSearchFilter,
//     },
//   });
// }
// if (this.state.globalSearchFilter === 'WorkOrders') {
//   this.props.history.replace({
//     pathname: '/workorders',
//     state: {
//       globalSearch: this.state.globalSearch,
//       globalSearchFilter: this.state.globalSearchFilter,
//     },
//   });
// }

// clearSearch: this.clearSearch()
// clearSearch
// globalSearchFilter: this.state.globalSearchFilter,
// } else if (
//   this.props.isLogin &&
//   this.props.location.pathname === '/comaround'
// ) {
//   return (
//     <div className='d-flex' id='layout'>
//       <Sidebar isOpen={this.state.isOpen} />
//       <div className='layout__children'>
//         <HeaderTicket
//           navbarShowHandlder={() => {
//             this.setState({ isOpen: true });
//           }}
//           systemAlerts={this.state.alerts}
//           logoutHandler={this.logoutHandler}
//           profileRouteHandler={this.profileRouteHandler}
//         />
//         <HeaderSearch
//           history={this.props.history}
//           globalSearch={globalSearch}
//           suggestions={suggestions}
//           showSuggestions={showSuggestions}
//           spinnerSuggestion={spinnerSuggestion}
//           inputChangeHandler={this.inputChangeHandler}
//           searchPressHandler={this.searchPressHandler}
//           selectionHandler={this.selectionHandler}
//           globalSearchFilter={this.state.globalSearchFilter}
//         />
//         <div
//           style={{
//             height: '56%',
//             overflow: 'auto',
//             backgroundColor: 'rgb(231, 231, 231)',
//           }}
//         >
//           {this.props.children}
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }
