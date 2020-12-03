import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class SystemSurveys {
  getSurveys = (survey_body, callback) => {
    NetworkClient.getSearchResults(survey_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getIncidentInfoForSurvey = (survey_body, callback) => {
    NetworkClient.getSearchResults(survey_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  postSurveys = (survey_body, callback) => {
    NetworkClient.saveBusinessObject(survey_body, (res) => {
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

let SurveysModel = new SystemSurveys();
export default SurveysModel;
