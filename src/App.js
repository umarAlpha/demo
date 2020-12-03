import React, { Component } from 'react';
import { Switch, withRouter, Redirect } from 'react-router-dom';

//routes
import PublicRoute from './routes/public.routes';
import PrivateRoute from './routes/private.routes';

// higher order component
import Layout from './HOC/Layout/Layout';

// screens
import DashboardScreen from './screens/DashboardScreen/DashboardScreens';
import PendingApprovalScreen from './screens/PendingApprovalScreen/PendingApprovalScreen';
import MyTicketScreen from './screens/MyTicketsScreen/MyTicketScreen';
import SurveysScreen from './screens/SurveyScreen/SurveysScreen';
import AnnouncementScreen from './screens/AnnouncementScreen/AnnouncementScreen';
import ComaroundScreen from './screens/ComaroundScreen/ComaroundScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import CreateTicketScreen from './screens/CreateTicketScreen/CreateTicketScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import WorkOrdersScreen from './screens/WorkOrdersScreen/WorkOrdersScreen';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import SystemAlertScreen from './screens/SystemAlertScreen/SystemAlertScreen';
import CmdbLinkedItemsScreen from './screens/LinkedItemsScreen/LinkedItemsScreen';
// import NotFoundScreen from './screens/NotFoundScreen/NotFoundScreen';

// context api
import UserProvider from './ContextApi/UserInfoContext/provider';
import CountsProvider from './ContextApi/CountsContext/provider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // alerts: [],
      // clearSearch: false,
    };
  }

  componentDidMount() {
    if (
      !localStorage.getItem('userInfoComment') ||
      !localStorage.getItem('login_token')
    ) {
      localStorage.clear();
      this.props.history.push('/login');
    }
  }

  componentWillUnmount() {}

  // getSystemAlerts={(alerts) => this.setState({ alerts: alerts })}
  // clearSearch={(value) => this.setState({clearSearch: value})}
  // systemALerts={alerts}

  render() {
    return (
      <Switch>
        <UserProvider>
          <CountsProvider>
            <Layout
              isLogin={localStorage.getItem('login_token') ? true : false}
              location={this.props.location}
              history={this.props.history}
            >
              {this.props.location.pathname === '/' && <Redirect to='/login' />}
              <PrivateRoute path='/home' exact component={DashboardScreen} />
              <PrivateRoute exact path='/myticket' component={MyTicketScreen} />
              <PrivateRoute
                exact
                path='/pendingApproval'
                component={PendingApprovalScreen}
              />
              <PrivateRoute exact path='/surveys' component={SurveysScreen} />
              <PrivateRoute
                exact
                path='/announcement'
                component={AnnouncementScreen}
              />
              <PrivateRoute
                exact
                path='/linkeditems'
                component={CmdbLinkedItemsScreen}
              />
              <PrivateRoute
                exact
                path='/systemalerts'
                component={SystemAlertScreen}
              />
              <PrivateRoute
                exact
                path='/comaround'
                component={ComaroundScreen}
              />
              <PrivateRoute
                exact
                path='/createticket'
                component={CreateTicketScreen}
              />
              <PrivateRoute
                exact
                path='/workorders'
                component={WorkOrdersScreen}
              />
              <PrivateRoute exact path='/search' component={SearchScreen} />
              <PrivateRoute exact path='/profile' component={ProfileScreen} />
              <PublicRoute
                path='/login'
                exact
                component={LoginScreen}
                restricted={true}
              />
            </Layout>
          </CountsProvider>
        </UserProvider>
      </Switch>
    );
  }
}

export default withRouter(App);
