import Approval from '../../BussinessObjects/Approval.js';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo.js';
import {
  getValueForFieldId,
  generateFieldObject,
  generateCreateFieldObject,
  generateSortingObject,
} from '../../Utility/CommonMethods';

class ApprovalBody {
  getFilters = (Statuses) => {
    let filters = [];

    const customerInformation = JSON.parse(
      localStorage.getItem('customer_information')
    );

    if (!customerInformation) {
    } else {
      const fullName = getValueForFieldId(
        CustomerUserInfo.fields.FullName,
        '',
        customerInformation.response.businessObjects[0].fields
      );

      filters.push(generateFieldObject(Approval.fields.ApproverName, fullName));

      Statuses.map((status) => {
        return filters.push(
          generateFieldObject(Approval.fields.Status, status)
        );
      });
    }

    return filters;
  };

  informationFilter = (filters) => {
    let filter = [];
    filter.push(generateFieldObject(filters.recId, filters.parentRecId));
    return filter;
  };

  generateApprovalFieldsBody = (approvalValue, approverComment) => {
    let fields = [];
    fields.push(
      generateCreateFieldObject(Approval.fields.Status, approvalValue)
    );
    fields.push(
      generateCreateFieldObject(
        Approval.fields.ApprovalComments,
        approverComment
      )
    );
    return fields;
  };

  approvalBody = (page, perPage) => {
    return {
      busObId: Approval.busObId,
      fields: Object.values(Approval.fields),
      filters: this.getFilters(Approval.customerStatuses),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(Approval.fields.lastModifiedDate, 0)],
    };
  };

  informationForApprovalBody = (busObId, fields, filters) => {
    return {
      busObId: busObId,
      fields: fields,
      filters: this.informationFilter(filters),
    };
  };

  generateApprovalBody = (busObId, RecId, approvalValue, approverComment) => {
    return {
      busObId: busObId, //Approval BusOb Records
      busObRecId: RecId, //RecID for Approval
      fields: this.generateApprovalFieldsBody(approvalValue, approverComment),
      persist: true,
    };
  };
}

let ApproveBody = new ApprovalBody();
export default ApproveBody;
