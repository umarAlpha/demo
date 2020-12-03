import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class ClassificationsModel{
    getClassificationServices = ( classification_services_body , callback ) =>{

        NetworkClient.getSearchResults( classification_services_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    getClassificationCategory = ( classification_services_category_body , callback ) =>{

        NetworkClient.getSearchResults( classification_services_category_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    getClassificationSubCategory = ( classification_services_subcategory_body , callback ) =>{

        NetworkClient.getSearchResults( classification_services_subcategory_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    getClassifications = ( classification_body , callback ) =>{

        NetworkClient.getSearchResults( classification_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    postIncident = ( classification_body , callback ) =>{

        NetworkClient.saveBusinessObject( classification_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    // Search Catalog
    getQuickClassifications = ( classification_body , callback ) =>{

        NetworkClient.getQuickSearchResults( classification_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }

    getClassificationDataWithSearch = ( classification_services_subcategory_body , callback ) =>{

        NetworkClient.getSearchResults( classification_services_subcategory_body , (res) => {

            let hasError = res.response.hasError;

            if(hasError){
                let error = res.response.errorMessage;
                callback(RESPONSE(false,error, ''));
            }
            else{
                callback(RESPONSE(true, '', res));
            }
        });

    }
}

let ClassificationModel = new ClassificationsModel();
export default ClassificationModel;