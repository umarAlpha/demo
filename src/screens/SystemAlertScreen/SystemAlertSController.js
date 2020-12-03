import AlertsModel from '../../Models/SystemAlerts/Model';
import AlertsBody from '../../Models/SystemAlerts/Body';
import RESPONSE from '../../Services/HttpResponse';

class SystemAlertsController {
  systemAlerts = (page, perPage, callback) => {
    AlertsModel.getAlerts(AlertsBody.alertsBody(page, perPage), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  linkTicket = (classification, recid, ownedByTeam, callback) => {
    AlertsModel.linkAlerts(
      AlertsBody.linkSystemAlert(classification, recid, ownedByTeam),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

}

let AlertController = new SystemAlertsController();
export default AlertController;
