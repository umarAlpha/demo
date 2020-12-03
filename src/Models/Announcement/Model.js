import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class Announcement {
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
}
let announcement = new Announcement();
export default announcement;