import AlertsModel from '../../Models/Announcement/Model';
import AlertsBody from '../../Models/Announcement/Body';
import RESPONSE from '../../Services/HttpResponse';

class AnnouncementController {
    announcements = (callback) => {
        // console.log("annoucements Body ===>", AlertsBody.alertsBody());
        AlertsModel.getAlerts(AlertsBody.alertsBody(), (res) => {
            // console.log("res in Annoucements ===>", res);
            if (!res.success) {
                callback(RESPONSE(false, res.message, ''));
            } else {
                callback(RESPONSE(true, '', res.data.response));
            }
        });
    }
}
let AlertController = new AnnouncementController();
export default AlertController;