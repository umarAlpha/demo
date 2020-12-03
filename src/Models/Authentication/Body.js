import CurrentUserLoginDev from '../../BussinessObjects/CurrentLoggedInUserDev';
import {generateCreateFieldObject, generateSortingObject} from '../../Utility/CommonMethods';

class AuthenticationBody {
  customerLoginSoapApiBody = (username, password) =>
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\<soap:Body>\<PortalLogin xmlns="http://cherwellsoftware.com">\
      <userId>' +
    username +
    '</userId>\
                <password>' +
    password +
    '</password>\
                <useSAML>false</useSAML>\
                </PortalLogin>\
            </soap:Body>\
        </soap:Envelope>';

  customerLoginSoapApiTokenBody = {
    grant_type: 'password',
    client_id: '1d1e7e68-2305-477f-ae43-9890f847c0fd',
    username: 'sigmaGO_API',
    password: 'peV=f5i?Y,Bor4Rg',
    auth_mode: 'Internal',
  };

  getUserInfoBody = () => {
    return {
      busObId: '93405caa107c376a2bd15c4c8885a900be316f3a72', //Customer - Internal
      includeAllFields: true,

      filters: [
        {
          fieldId: '9337c2311be1de079984b34edb8aa7129a564327a2', //Rec ID
          operator: 'equals',
          value: localStorage.getItem('connection_id'), //PLACE UserConnectionId from "sigmaGO - Customer Authentication"
        },
      ],
    };
  };

  registerCurrentUserLogin = (recId) => {
    return {
      busObId: CurrentUserLoginDev.busObId,
      includeAllFields: true,
      filters: [
        generateCreateFieldObject(CurrentUserLoginDev.fields.ModuleCode, 'RESTAPI'),
        generateCreateFieldObject(CurrentUserLoginDev.fields.UserBusObRecID, recId)
      ],
      sorting: [generateSortingObject(CurrentUserLoginDev.fields.LastModifiedDate, 0)]
    }
  }
}
let AuthBody = new AuthenticationBody();
export default AuthBody;
