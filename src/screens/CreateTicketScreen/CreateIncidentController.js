import ClassificationModel from '../../Models/Classifications/Model';
import RESPONSE from '../../Services/HttpResponse';
import ClassificationModelBody from '../../Models/Classifications/Body';

class IncidentClassificationsController {
  getServices = (callback) => {
    // const body = ClassificationModelBody.servicesBody();
    // console.log("Service body", JSON.stringify(body));
    ClassificationModel.getClassificationServices(
      ClassificationModelBody.servicesBody(),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  getCategories = (servicesRecId, callback) => {
    ClassificationModel.getClassificationCategory(
      ClassificationModelBody.categoryBody(servicesRecId),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  getSubCategories = (categoryRecId, callback) => {
    ClassificationModel.getClassificationSubCategory(
      ClassificationModelBody.subCategoryBody(categoryRecId),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  serviceFromCategory = (categoryName, callback) => {
    ClassificationModel.getClassificationDataWithSearch(
      ClassificationModelBody.getClassificationServiceWithSelection(
        categoryName
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

  serviceCategoryFromSubCategory = (subCategoryName, callback) => {
    ClassificationModel.getClassificationDataWithSearch(
      ClassificationModelBody.getClassificationServiceCategoryWithSelection(
        subCategoryName
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

  quickSearchClassification = (searchVal, callback) => {
    ClassificationModel.getQuickClassifications(
      ClassificationModelBody.quickClassificationResult(searchVal),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  createIncident = (classificationsValues, title, description, callback) => {
    let body = ClassificationModelBody.createIncidentBody(
      classificationsValues,
      title,
      description
    );

    console.log(JSON.stringify(body));

    ClassificationModel.postIncident(body, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };
}

let ClassificationsController = new IncidentClassificationsController();
export default ClassificationsController;
