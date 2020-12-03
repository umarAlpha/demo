import AuthBody from '../../Models/Authentication/Body';
import CommonDataManager from '../../Services/Singleton';
import AuthModel from '../../Models/Authentication/Model';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo';

const qs = require('querystring');

class AuthenticationController {
  login = (userName, password, callback) => {
    AuthModel.customerAuthenticationRequest(userName, password, (response) => {
      // console.log("Response =>", response);
      if (response.success) {
        let connnection_id = response.data;
        // console.log(connnection_id);
        localStorage.setItem('connection_id', connnection_id);
        CommonDataManager.getInstance().setConId(connnection_id);

        let token_request_body = qs.stringify(
          AuthBody.customerLoginSoapApiTokenBody
        );

        AuthModel.getAuthenticationToken(token_request_body, (response) => {
          let token = response.data;

          CommonDataManager.getInstance().setAuthToken(token);

          localStorage.setItem('login_token', token);

          if (response.success) {
            let customer_info_body = AuthBody.getUserInfoBody(connnection_id);

            AuthModel.getCustomerInformationResult(
              customer_info_body,
              (response) => {
                localStorage.setItem(
                  'customer_information',
                  JSON.stringify(response.data)
                );
                this.getUserInformation(response.data);
                // this.comaroundLogin();
                callback(response);
              }
            );
          }
        });
      } else {
        callback(response);
      }
    });
  };

  comaroundLogin = (callback) => {
    AuthModel.getComAroundInformationResult((res) => {
      // console.log('Com response =>', res);
      if (!res.success) {
        callback(false);
      } else {
        let token = res.data.response.access_token;
        localStorage.setItem('authToken_comaround', token);
        callback(true);
      }
    });
  };

  getUserInformation = (data) => {
    let feilds = data.response.businessObjects[0].fields;

    let recid, name, avatar, email, department, phone, title, mobile, manager, emp_id;

    recid = getValueForFieldId(CustomerUserInfo.fields.RecID, '', feilds);
    name = getValueForFieldId(CustomerUserInfo.fields.FullName, '', feilds);
    avatar = getValueForFieldId(CustomerUserInfo.fields.Avatar, '', feilds);
    email = getValueForFieldId(CustomerUserInfo.fields.Email, '', feilds);
    emp_id = getValueForFieldId(CustomerUserInfo.fields.EmployeeID, '', feilds);
    mobile = getValueForFieldId(CustomerUserInfo.fields.Mobile, '', feilds);
    department = getValueForFieldId(
      CustomerUserInfo.fields.Department,
      '',
      feilds
    );
    phone = getValueForFieldId(CustomerUserInfo.fields.Phone, '', feilds);
    title = getValueForFieldId(CustomerUserInfo.fields.Title, '', feilds);
    manager = getValueForFieldId(CustomerUserInfo.fields.Manager, '', feilds);

    localStorage.setItem(
      'userInfoComment',
      JSON.stringify({
        recid,
        userName: name,
        userAvatar: avatar,
        email,
        emp_id,
        mobile,
        department,
        phone,
        title,
        manager,
      })
    );
  };
}

let LoginController = new AuthenticationController();
export default LoginController;
