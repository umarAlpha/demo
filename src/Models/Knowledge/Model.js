import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class KnowledgeArticleModel{

    getknowledgeSearch = ( knowledge_search_body , callback ) =>{
        NetworkClient.getSearchResults( knowledge_search_body , (res) => {
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

    getAttachments = ( busObId, busObRecId, callback ) =>{

        NetworkClient.getIncidentRelatedAttachments( busObId, busObRecId, (res) => {

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


    postAttachments = (res, recid , busObId , fileSize, fileName, callback) => {
        NetworkClient.postbusinessobjectattachments( res, recid , busObId , fileSize, fileName, (res) => {
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

    getKnowledgeMarkUp = (KnowledgeArticleUrlData, callback) => {
        NetworkClient.getBusinessObject(KnowledgeArticleUrlData , (res) => {
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

let KnowledgeModel = new KnowledgeArticleModel();
export default KnowledgeModel;