import endPoints from './EndPoints';
import Api from './ApiService';
import CommonDataManager from './Singleton';

class ApiClient {
  getNoNetworkResponse = () => {
    return {
      status: 204,
      response: {
        businessObjects: [],
        relatedBusinessObjects: [],
        values: [],
        errorMessage: CommonDataManager.getInstance().NO_NETWORK_ERROR,
        hasError: true,
      },
    };
  };

  getBaseUrl = () => {
    return CommonDataManager.getInstance().getBaseUrl();
  };

  getComAroundBaseUrl = () => {
    return CommonDataManager.getInstance().getComAroundBaseUrl();
  };

  sendTokenRequest = (data, isLDAPLogin, samlLogin, callback) => {
    let url = this.getBaseUrl() + '/';

    if (isLDAPLogin) {
      url += endPoints.token + '?auth_mode=SAML';
    } else if (samlLogin) {
      url += endPoints.token + '?auth_mode=LDAP';
    } else {
      url += endPoints.token;
    }

    Api.sendPostWithoutAuth(url, data, (response) => {
      callback(response);
    });
  };

  getSearchResults = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.getsearchresults;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  getQuickSearchResults = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.getquicksearchresults;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  saveBusinessObject = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.savebusinessobject;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  getBusinessObject = (KnowledgeArticleUrlData, callback) => {
    let url =
      this.getBaseUrl() +
      '/' +
      endPoints.getBusinessObject +
      '/busobid/' +
      KnowledgeArticleUrlData.busObId +
      '/busobrecid/' +
      KnowledgeArticleUrlData.parentRecId;
    Api.sendGetWithAuth(url, (response) => {
      callback(response);
    });
  };

  getLinkedItemDetails = (LinkedItemIds, callback) => {
    let url =
      this.getBaseUrl() +
      '/' +
      endPoints.getBusinessObject +
      '/busobid/' +
      LinkedItemIds.busobid +
      '/busobrecid/' +
      LinkedItemIds.busobrecid;
    Api.sendGetWithAuth(url, (response) => {
      callback(response);
    });
  };

  saverelatedbusinessobject = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.saverelatedbusinessobject;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  getRelatedBusinessObject = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.getrelatedbusinessobject;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  getrelatedbusinessobject = (dataModel, callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.getrelatedbusinessobject;

    Api.sendPostWithAuth(url, dataModel, (response) => {
      callback(response);
    });
  };

  getIncidentRelatedAttachments = (busObId, busObRecId, callback) => {
    let url =
      this.getBaseUrl() +
      '/' +
      endPoints.getbusinessobjectattachments1 +
      '/busobid/' +
      busObId +
      '/busobrecid/' +
      busObRecId +
      '/type/File/attachmenttype/Imported?includelinks=true';

    Api.sendGetWithAuth(url, (response) => {
      callback(response);
    });
  };

  postbusinessobjectattachments = (
    file,
    recid,
    busObId,
    fileSize,
    fileName,
    callback
  ) => {
    let base64 = this.base64ToArrayBuffer(file);
    var buffer = Buffer.from(base64);
    console.log('Buffer===>', buffer);
    let url =
      this.getBaseUrl() +
      '/' +
      endPoints.uploadbusinessobjectattachment +
      '/filename/' +
      fileName +
      '/busobid/' +
      busObId +
      '/busobrecid/' +
      recid +
      '/offset/0/totalsize/' +
      fileSize;
    Api.sendPostWithAttachment(url, buffer, (response) => {
      callback(response);
    });
  };
  base64ToArrayBuffer = (dataURI) => {
    let BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  };

  //Comaround

  getComAroundSearchResults = (url, callback) => {
    Api.sendGetWithComAround(url, (response) => {
      callback(response);
    });
  };

  // getComSearchResult = (url, callback) => {
  //   Api.sendGetWithComAround(url, (response) => {
  //     callback(response);
  //   });
  // };

  sendPostWithComaround = (dataModel, url, callback) => {
    Api.sendPostWithComaround(dataModel, url, (response) => {
      callback(response);
    });
  };

  // Global serach Filters Api's
  comAroundLogin = (callback) => {
    let url = endPoints.BASE_URL + endPoints.Authentication_End_Point;

    Api.sendPostLoginWithAuth(url, (response) => {
      callback(response);
    });
  };

  postComAroundSearchResults = (url, dataModel, callback) => {
    Api.sendPostWithComAround(url, dataModel, (response) => {
      callback(response);
    });
  };

  logout = (callback) => {
    let url = this.getBaseUrl() + '/' + endPoints.logout;
    Api.sendLogout(url, (response) => {
      callback(response);
      console.log('LOgout PROCESSSSSSS=========>', response);
    });
  };
}

const NetworkClient = new ApiClient();
export default NetworkClient;
