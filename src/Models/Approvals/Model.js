import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class ApprovalModel {
  getIncidents = (approval_body, callback) => {
    NetworkClient.getSearchResults(approval_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getIncidentInformationApprovals = (information_body, callback) => {
    NetworkClient.getSearchResults(information_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getKnowledgeArticalesInfo = (KnowledgeArticleUrlData, callback) => {
    NetworkClient.getBusinessObject(KnowledgeArticleUrlData, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getKnowledgeArticlesInfo = (KnowledgeArticleUrlData, callback) => {
    NetworkClient.getBusinessObject(KnowledgeArticleUrlData, (res) => {
      let hasError = res.response.hasError;
      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  postApproveDeny = (apprvdeny_body, callback) => {
    NetworkClient.saveBusinessObject(apprvdeny_body, (res) => {
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

let ApproveModel = new ApprovalModel();
export default ApproveModel;
