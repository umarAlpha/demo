export default class CommonDataManager {
  static myInstance = null;

  // https://sigmagopocaa.centralus.cloudapp.azure.com
  proxyUrl = 'https://sigmago.herokuapp.com/';
  // baseInstanceUrl = 'http://sigmagodev.centralus.cloudapp.azure.com';
  baseInstanceUrl = "https://sigmagodemo.sigmagoapps.com";
  // baseUrl = this.proxyUrl+this.baseInstanceUrl;
  baseUrl = this.baseInstanceUrl;

  connection_id = '';

  token = '';

  userInfoObject = {};

  /**
   * @returns {CommonDataManager}
   */
  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }

    return this.myInstance;
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  setComAroundBaseUrl(url) {
    this.ComAround_baseUrl = url;
  }

  getComAroundBaseUrl() {
    return this.ComAround_baseUrl;
  }

  setConId(cid) {
    this.connection_id = cid;
  }

  getConId() {
    return this.connection_id;
  }

  setAuthToken(token) {
    this.token = token;
  }

  getAuthToken() {
    return this.token;
  }

  setUserInformation(data) {
    this.userInfoObject = data;
  }

  getUserInformation() {
    return this.userInfoObject;
  }
}

// CommonDataManger.getInstance().getUserInfo();
// CommonDataManger.getInstance().setUserInfo(id);
