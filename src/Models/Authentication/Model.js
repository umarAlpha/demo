import RESPONSE from '../../Services/HttpResponse';
import AuthBody from './Body';
import CommonDataManager from '../../Services/Singleton';
import endPoints from '../../Services/EndPoints';
import XMLParser from 'react-xml-parser';
import NetworkClient from '../../Services/ApiClient';
class AuthenticationModel {
  xmlHttpRequest = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'text/xml');
    return xhr;
  };

  customerAuthenticationRequest = (username, password, callback) => {
    let str = AuthBody.customerLoginSoapApiBody(username, password);
    let soapUrl =
      CommonDataManager.getInstance().getBaseUrl() + endPoints.connectionID;

    let xhr = this.xmlHttpRequest(soapUrl);
    xhr.onload = () => {
      const results = xhr.responseText;

      console.log('Results =============>', results);
      let xml = new XMLParser().parseFromString(results);

      console.log('XML =============>', xml);
      let result = xml.getElementsByTagName('PortalLoginResult');

      console.log('Trim =============>', result);
      let trim = result[0].value;

      const string = 'Message';
      const data = trim.includes(string);
      if (data) {
        const error = trim.slice(43, 100);
        // setTimeout(() => {
        //     alert(error);
        // }, 200);
        callback(RESPONSE(false, error, ''));
      } else {
        const connectionId = trim.slice(105, 147);
        callback(RESPONSE(true, '', connectionId));
      }
    };
    xhr.send(str);
  };

  getAuthenticationToken = (token_request_body, callback) => {
    NetworkClient.sendTokenRequest(token_request_body, false, false, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = 'Error';
        callback(RESPONSE(false, error, ''));
      } else {
        let token = res.response.access_token;
        callback(RESPONSE(true, '', token));
      }
    });
  };

  getCustomerInformationResult = (get_result_body, callback) => {
    // console.log("Body=====>",get_result_body);

    NetworkClient.getSearchResults(get_result_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = 'Error';
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getComAroundInformationResult = (callback) => {
    NetworkClient.comAroundLogin((res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = 'Error';
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  LogoutApp = (callback) => {
    NetworkClient.logout((res) => {
      callback(res);
    });
  };
}
let AuthModel = new AuthenticationModel();
export default AuthModel;
