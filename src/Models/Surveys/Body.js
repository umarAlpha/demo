import Survey from '../../BussinessObjects/Survey';
import Incident from '../../BussinessObjects/Incident';
import {
  generateCreateFieldObject,
  generateSortingObject,
  generateFieldObject,
  getValueForFieldId,
} from '../../Utility/CommonMethods';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo';

class SystemSurveysBody {
  getFilters = () => {
    const customerInformation = JSON.parse(
      localStorage.getItem('customer_information')
    );
    if (!customerInformation) {
    } else {
      let filters = [];
      let RecID = getValueForFieldId(
        CustomerUserInfo.fields.RecID,
        '',
        customerInformation.response.businessObjects[0].fields
      );
      filters.push(generateFieldObject(Survey.fields.SurveyTakerID, RecID));
      filters.push(
        generateFieldObject(Survey.fields.CreatedDateTime, '2019-01-08', 'gt')
      );
      filters.push(generateFieldObject(Survey.fields.Total, '1', 'lt'));
      return filters;
    }
  };

  surveyBody = (page, perPage) => {
    return {
      busObId: Survey.busObId,
      includeAllFields: true,
      filters: this.getFilters(),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(Survey.fields.LastModDateTime, 0)],
    };
  };

  getSurveyInfoFilters = (parentRecId) => {
    let filters = [];
    filters.push(generateFieldObject(Incident.fields.RecID, parentRecId));
    return filters;
  };

  getSendSurveyFields = (
    message,
    rating,
    rating2,
    rating3,
    rating4,
    rating5
  ) => {
    let fields = [];
    const customerInformation = JSON.parse(
      localStorage.getItem('customer_information')
    );

    if (!customerInformation) {
    } else {
      // const fullName = getValueForFieldId(CustomerUserInfo.fields.FullName, "", customerInformation.response.businessObjects[0].fields);
      // const Avatar = getValueForFieldId(CustomerUserInfo.fields.Avatar, "", customerInformation.response.businessObjects[0].fields);

      fields.push(generateCreateFieldObject(Survey.fields.Question1, rating));
      fields.push(generateCreateFieldObject(Survey.fields.Question2, rating2));
      fields.push(generateCreateFieldObject(Survey.fields.Question3, rating3));
      fields.push(generateCreateFieldObject(Survey.fields.Question4, rating4));
      fields.push(generateCreateFieldObject(Survey.fields.Question5, rating5));
      fields.push(generateCreateFieldObject(Survey.fields.Comments, message));
      fields.push(generateCreateFieldObject(Survey.fields.CreatedDateTime)); //Set 2 hours in advanced of time found on the Mobile users phone (7:55 is actually 5:55)
    }
    return fields;
  };

  postSurveyBody = (
    busObRecId,
    message,
    rating,
    rating2,
    rating3,
    rating4,
    rating5
  ) => {
    return {
      busObId: Survey.busObId,
      busObRecId: busObRecId, //Put the selected ticket's RecID here
      fields: this.getSendSurveyFields(
        message,
        rating,
        rating2,
        rating3,
        rating4,
        rating5
      ),
      persist: true,
    };
  };

  getSystemIncidentInfoForSurveyBody = (parentRecId) => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getSurveyInfoFilters(parentRecId),
    };
  };
}

let SurveysBody = new SystemSurveysBody();
export default SurveysBody;
