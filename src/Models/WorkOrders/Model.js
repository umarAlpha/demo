import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class WorkOrderModel {
  getworkOrders = (work_orders_body, callback) => {
    NetworkClient.getSearchResults(work_orders_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  postComments = (comment_body, callback) => {
    NetworkClient.saverelatedbusinessobject(comment_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getComments = (comment_body, callback) => {
    NetworkClient.getRelatedBusinessObject(comment_body, (res) => {
      let hasError = res.response.hasError;
      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };
  getAttachments = (busObId, busObRecId, callback) => {
    NetworkClient.getIncidentRelatedAttachments(busObId, busObRecId, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  postAttachments = (res, recid, busObId, fileSize, fileName, callback) => {
    NetworkClient.postbusinessobjectattachments(
      res,
      recid,
      busObId,
      fileSize,
      fileName,
      (res) => {
        let hasError = res.response.hasError;
        if (hasError) {
          let error = res.response.errorMessage;
          callback(RESPONSE(false, error, ''));
        } else {
          callback(RESPONSE(true, '', res));
        }
      }
    );
  };
}

let WorkModel = new WorkOrderModel();
export default WorkModel;
