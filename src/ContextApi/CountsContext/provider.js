import React from 'react';
import CountsContext from './context';

import IncidentController from '../../screens/DashboardScreen/IncidentController';
import ApprovalController from '../../screens/PendingApprovalScreen/PendingApprovalsController';
import SurveyController from '../../screens/SurveyScreen/SurveyController';

class CountsProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allIncidentsCount: 0,
      closedCount: 0,
      pendingCount: 0,
      surveyCount: 0,
      ticketModal: false,
    };
  }

  componentDidMount() {
    this.getAllIncidentsCount();
    this.getPendingsCount();
    this.getSurveysCount();
    this.getCloseCount();
  }

  getAllIncidentsCount() {
    IncidentController.openIncidents((res) => {
      if (res.success === false) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        this.setState({ allIncidentsCount: res.data.totalRows });
      }
    });
  }

  getCloseCount() {
    IncidentController.closeIncidents((res) => {
      this.setState({ closedCount: res.data.totalRows });
    });
  }

  getPendingsCount() {
    ApprovalController.pendingApproval((res) => {
      if (res.success === false) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        this.setState({ pendingCount: res.data.totalRows });
      }
    });
  }

  getSurveysCount() {
    SurveyController.systemSurveys((res) => {
      if (res.success === false) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        this.setState({ surveyCount: res.data.totalRows });
      }
    });
  }

  render() {
    const {
      allIncidentsCount,
      closedCount,
      pendingCount,
      surveyCount,
    } = this.state;

    return (
      <CountsContext.Provider
        value={{
          counters: {
            allIncidentsCount,
            closedCount,
            pendingCount,
            surveyCount,
          },
          ticketModal: this.state.ticketModal,
          openModal: () => this.setState({ticketModal: true}),
          closeModal: () => this.setState({ticketModal: false})
        }}
      >
        {this.props.children}
      </CountsContext.Provider>
    );
  }
}
export default CountsProvider;
