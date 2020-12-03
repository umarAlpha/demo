import SystemAlert from '../../BussinessObjects/SystemAlert';
import Incident from '../../BussinessObjects/Incident';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo';

import {
  generateCreateFieldObject,
  generateSortingObject,
  generateFieldObject,
  getValueForFieldId
} from '../../Utility/CommonMethods';

class SystemAlertsBody {

  getFilters = (customerStatuses) => {
    let filters = [];

    customerStatuses.map((status) => {
      return filters.push(
        generateCreateFieldObject(SystemAlert.fields.Status, status)
      );
    });
    filters.push(generateFieldObject(SystemAlert.VisibleInPortal, 'True'));
    return filters;
  };

  getLinkSystemAlert = (classificationsValues, recid, ownedByTeam) => {
    let fields = [];

    const customerInformation = JSON.parse(
      localStorage.getItem("customer_information")
    );

    if (!customerInformation) {
    } else {
      const fullName = getValueForFieldId(
        CustomerUserInfo.fields.FullName,
        "",
        customerInformation.response.businessObjects[0].fields
      );

      const customerId = getValueForFieldId(
        CustomerUserInfo.fields.RecID,
        "",
        customerInformation.response.businessObjects[0].fields
      );

      fields.push(
        generateCreateFieldObject(
          Incident.fields.Service,
          classificationsValues.service
        )
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.Category,
          classificationsValues.category
        )
      );

      fields.push(
        generateCreateFieldObject(Incident.fields.LinkedProblem, recid)
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.Description,
          "No addtional details"
        )
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.OwnedByTeam, ownedByTeam)
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.ShortDescription,
          "No addtional details"
        )
      );
      fields.push(generateCreateFieldObject(Incident.fields.Priority, "1"));
      fields.push(generateCreateFieldObject(Incident.fields.Impact, "Company"));
      fields.push(generateCreateFieldObject(Incident.fields.Urgency, "High"));
      fields.push(
        generateCreateFieldObject(Incident.fields.CustomerDisplayName, fullName)
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.CustomerID, customerId)
      );
      // fields.push(generateCreateFieldObject(Incident.fields.Status, 'New'));
      fields.push(
        generateCreateFieldObject(Incident.fields.CallSource, "Portal")
      );
    }

    return fields;
  };

  alertsBody = (page, perPage) => {
    return {
      busObId: SystemAlert.busObId,
      fields: Object.values(SystemAlert.fields),
      // includeAllFields: true,
      filters: this.getFilters(SystemAlert.customerStatuses),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(SystemAlert.fields.lastModifiedDate, 0)],
    };
  };

  linkSystemAlert = (classification, recid, ownedByTeam) => {
    return {
      busObId: Incident.busObId,
      fields: this.getLinkSystemAlert(classification, recid, ownedByTeam),
      persist: true,
    };
  };

}

let AlertsBody = new SystemAlertsBody();
export default AlertsBody;
