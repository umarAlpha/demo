import ComAroundModelBody from '../../Models/ComAround/Body';
import ComAroundModel from '../../Models/ComAround/Model';
import RESPONSE from '../../Services/HttpResponse';
import endPoints from '../../Services/EndPoints';

class ComAroundController {
  getSearchArticles = (filter, callback) => {
    let url;
    url = endPoints.BASE_URL + endPoints.Get_Search + filter;

    ComAroundModel.getSubmitted(url, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getSearchArticlesWithFilter = (value, filter, callback) => {
    let url;
    url =
      endPoints.BASE_URL +
      endPoints.Get_Search_With_Filter +
      value +
      '&SortBy=' +
      filter;

    ComAroundModel.getSubmitted(url, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getSearchArticlesWithFilterPerPage = (
    value,
    filter,
    page,
    perPage,
    callback
  ) => {
    let url;
    url =
      endPoints.BASE_URL +
      endPoints.Get_Search_With_Filter +
      value +
      '&SortBy=' +
      filter +
      '&CurrentPage=' +
      page +
      '&ItemsPerPage=' +
      perPage;

    ComAroundModel.getSubmitted(url, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getGlobalSuggestions = (value, callback) => {
    let url;
    url = endPoints.BASE_URL + endPoints.Suggestions + value;

    ComAroundModel.getSubmitted(url, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getContentData = (id, callback) => {
    let url;
    url = endPoints.BASE_URL + '/v2/content/' + id;

    ComAroundModel.getSubmitted(url, (res) => {
      if (!res.success) {
        return null;
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  contentVoteSubmitted = (id, callback) => {
    let url;
    url = endPoints.BASE_URL + endPoints.VoteApi;

    ComAroundModel.postSubmitted(
      url,
      ComAroundModelBody.contentFormBody(id),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  contentFormReasonSubmitted = (id, obj, callback) => {
    let url, reason, email, title;
    url = endPoints.BASE_URL + endPoints.ArticleFeedback;
    reason = obj.reasonVal;
    email = obj.email;
    title = obj.title;

    // const body =  ComAroundModelBody.contentFormBody(id, reason, email, title);
    // console.log("Body =>", JSON.stringify(body));

    ComAroundModel.postSubmitted(
      url,
      ComAroundModelBody.contentFormBody(id, reason, email, title),
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

let ComController = new ComAroundController();
export default ComController;
