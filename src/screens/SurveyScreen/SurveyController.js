import SurveysModel from '../../Models/Surveys/Model';
import SurveysBody from '../../Models/Surveys/Body';
import RESPONSE from '../../Services/HttpResponse';

class SystemSurveysController {
  systemSurveys = (callback) => {
    let surveyBody = SurveysBody.surveyBody();
    SurveysModel.getSurveys(surveyBody, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  // systemSurveysPerPage

  systemSurveysPerPage = (page, perPage, callback) => {
    let surveyBody = SurveysBody.surveyBody(page, perPage);
    SurveysModel.getSurveys(surveyBody, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getSystemIncidentInfoForSurvey = (parentRecId, callback) => {
    let surveyBody = SurveysBody.getSystemIncidentInfoForSurveyBody(
      parentRecId
    );
    console.log('survey body => ', surveyBody);
    SurveysModel.getIncidentInfoForSurvey(surveyBody, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  surveyFeedback = (
    recID,
    comment,
    rating,
    rating2,
    rating3,
    rating4,
    rating5,
    callback
  ) => {
    SurveysModel.postSurveys(
      SurveysBody.postSurveyBody(
        recID,
        comment,
        rating,
        rating2,
        rating3,
        rating4,
        rating5
      ),
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

let SurveyController = new SystemSurveysController();
export default SurveyController;
