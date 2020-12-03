import AuthModel from '../../Models/Authentication/Model';
import RESPONSE from '../../Services/HttpResponse';

class LayoutController {
  LogoutProcessed = (callback) => {
    AuthModel.LogoutApp((res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };
}

let layoutController = new LayoutController();
export default layoutController;
