import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class ComAroundArticleModel {
  getArticles = (url, callback) => {
    NetworkClient.getComSearchResult(url, (res) => {
      let hasError = res.response.hasError;
      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  postSubmitted = (url, body, callback) => {
    NetworkClient.postComAroundSearchResults(url, body, (res) => {
      let status = res.status;

      if (status === 200 || status === 201) {
        callback(RESPONSE(true, '', res));
      } else {
        callback(RESPONSE(false, 'error', res));
      }
    });
  };
  //    Global Search

  getSubmitted = (url, callback) => {
    NetworkClient.getComAroundSearchResults(url, (res) => {
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

let ComAroundModel = new ComAroundArticleModel();
export default ComAroundModel;
