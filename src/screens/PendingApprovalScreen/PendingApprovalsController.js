import ApproveBody from '../../Models/Approvals/Body.js';
import ApproveModel from '../../Models/Approvals/Model.js';
import RESPONSE from '../../Services/HttpResponse';

import Approval from '../../BussinessObjects/Approval';
import Incident from '../../BussinessObjects/Incident';
import Knowledge from '../../BussinessObjects/Knowledge';
import ChangeRequest from '../../BussinessObjects/ChangeRequest';

class ApprovalIncidents {
  pendingApproval = (callback) => {
    // const body = ApproveBody.approvalBody();
    // console.log('Approval body =>', JSON.stringify(body));
    ApproveModel.getIncidents(ApproveBody.approvalBody(1, 10), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  pendingApprovalPerPage = (page, perPage, callback) => {
    // const body = ApproveBody.approvalBody();
    // console.log('Approval body =>', JSON.stringify(body));
    ApproveModel.getIncidents(ApproveBody.approvalBody(page, perPage), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  informationForApprovals = (parentTypeId, parentRecId, callback) => {
    let busObId;
    let fields;

    if (parentTypeId === Incident.busObId) {
      let filters = { recId: Incident.fields.RecID, parentRecId: parentRecId };

      busObId = Incident.busObId;
      fields = Object.values(Incident.fields);

      this.AllValues(busObId, fields, filters, (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(
            RESPONSE(true, '', { res: res.data.response, type: 'Incident' })
          );
        }
      });
    } else if (parentTypeId === ChangeRequest.busObId) {
      let filters = {
        recId: ChangeRequest.fields.RecID,
        parentRecId: parentRecId,
      };

      busObId = ChangeRequest.busObId;
      fields = Object.values(ChangeRequest.fields);
      this.AllValues(busObId, fields, filters, (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(
            RESPONSE(true, '', {
              res: res.data.response,
              type: 'ChangeRequest',
            })
          );
        }
      });
    } else if (parentTypeId === Knowledge.busObId) {
      let busObId = Knowledge.busObId;
      let KnowledgeArticleUrlData = {
        busObId: busObId,
        parentRecId: parentRecId,
      };

      ApproveModel.getKnowledgeArticalesInfo(KnowledgeArticleUrlData, (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(
            RESPONSE(true, '', { res: res.data.response, type: 'Knowledge' })
          );
        }
      });
    }
  };

  AllValues = (busObId, fields, filters, callback) => {
    let body = ApproveBody.informationForApprovalBody(busObId, fields, filters);
    ApproveModel.getIncidentInformationApprovals(body, (res) => {
      callback(res);
    });
  };

  postApproveDeny = (recid, value, comment, callback) => {
    let busObId = Approval.busObId;

    let body = ApproveBody.generateApprovalBody(busObId, recid, value, comment);

    console.log('Body is ===>', body);

    ApproveModel.postApproveDeny(body, (res) => {
      callback(res);
    });
  };
}

let ApprovalController = new ApprovalIncidents();
export default ApprovalController;
