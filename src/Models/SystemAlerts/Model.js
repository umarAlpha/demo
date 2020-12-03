import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class SystemAlerts {

    getAlerts = (alert_body, callback) => {

        NetworkClient.getSearchResults(alert_body, (res) => {

            let hasError = res.response.hasError;

            if (hasError) {
                let error = res.response.errorMessage;
                callback(RESPONSE(false, error, ''));
            } else {
                callback(RESPONSE(true, '', res));
            }
        });

    }

    linkAlerts = (alert_body, callback) => {
        NetworkClient.saveBusinessObject(alert_body, (res) => {
          let hasError = res.response.hasError;
    
          if (hasError) {
            let error = res.response.errorMessage;
            callback(RESPONSE(false, error, ''));
          } else {
            callback(RESPONSE(true, '', res));
          }
        });
      };

}

let AlertsModel = new SystemAlerts();
export default AlertsModel;