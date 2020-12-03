import IncModel from '../../Models/Incidents/Model';
import IncBody from '../../Models/Incidents/Body';

import RESPONSE from '../../Services/HttpResponse';

class AllIncidents {
  openIncidents = (callback) => {
    IncModel.getIncidents(IncBody.openIncidentBody(), (res) => {
      // console.log('res == ', res);
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  closeIncidents = (callback) => {
    IncModel.getIncidents(IncBody.closeIncidentBody(), (res) => {
      console.log('res == ', res);
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  allIncidents = (callback) => {
    IncModel.getIncidents(IncBody.allIncidentBody(), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };
}

let IncidentController = new AllIncidents();
export default IncidentController;
