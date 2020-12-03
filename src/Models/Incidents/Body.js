import Incident from '../../BussinessObjects/Incident.js';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo.js';
import Comment from '../../BussinessObjects/Comment';
import {
  getValueForFieldId,
  generateCreateFieldObject,
  generateSortingObject,
  generateFieldObject,
} from '../../Utility/CommonMethods';

class IncidentBody {
  getFilters = (IncidentStatuses) => {
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

      filters.push(
        generateCreateFieldObject(Incident.fields.CustomerDisplayName, fullName)
      );
      
      IncidentStatuses.map((status) => {
        return filters.push(
          generateCreateFieldObject(Incident.fields.Status, status)
        );
      });
    }

    return filters;
  };

  allIncidentBody = (pageNumber, pageSize) => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(Incident.allIncidentStatuses),
      pageNumber: pageNumber,
      pageSize: pageSize,
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  allIncidentBodyBySearch = (pageNumber, pageSize, searchText) => {
    return {
      busObId: Incident.busObId,
      searchText: searchText,
      fields: Object.values(Incident.fields),
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: this.getFilters(Incident.allIncidentStatuses),
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  IncidentBodyWithStatus = (status, page, perPage) => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(
        status === 'All'
          ? Incident.allIncidentStatuses
          : status === 'Open Tickets'
          ? Incident.openIncidentStatuses
          : status === 'Closed and Resolved'
          ? Incident.closedIncidentStatuses
          : [status]
      ),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  openIncidentBody = () => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(Incident.openIncidentStatuses),
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  openIncidentBodyWithPage = (page, perPage) => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(Incident.openIncidentStatuses),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  closeIncidentBody = () => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(['Closed']),
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  closeIncidentBodyWithPage = (page, perPage) => {
    return {
      busObId: Incident.busObId,
      fields: Object.values(Incident.fields),
      filters: this.getFilters(Incident.closedIncidentStatuses),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(Incident.fields.lastModifiedDate, 0)],
    };
  };

  getResolveTicketBody = (busObRecId, status, closeTicketText) => {
    return {
      busObRecId: busObRecId,
      busObId: Incident.busObId, //Incident BusOb
      fields: this.getResolveTicketFields(status, closeTicketText),
      persist: true,
    };
  };

  getCommentsBody = (busObRecId) => {
    return {
      parentBusObId: Incident.busObId,
      parentBusObRecId: busObRecId, //Put the selected ticket's RecID here
      relationshipId: Comment.relationshipId,
      fieldsList: this.getCommentsFields(),
      filters: this.getCommentsBodyFields(),
      pageNumber: 1,
      // "pageSize": config.listPageSize,
      useDefaultGrid: false,
    };
  };

  getCommentsFields = () => {
    let fieldList = [];
    fieldList.push(Comment.fields.Details);
    fieldList.push(Comment.fields.CreatedByName);
    fieldList.push(Comment.fields.CreatedDateTime);
    fieldList.push(Comment.fields.JournalType);
    fieldList.push(Comment.fields.Avatar);
    return fieldList;
  };

  getCommentsBodyFields = () => {
    let filters = [];
    filters.push(
      generateFieldObject(Comment.fields.JournalType, 'Journal - Comment')
    );
    return filters;
  };

  getSendCommentFields = (message) => {
    // let fullName = "";
    // let Avatar = "";
    let fields = [];
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
      const Avatar = getValueForFieldId(
        CustomerUserInfo.fields.Avatar,
        '',
        customerInformation.response.businessObjects[0].fields
      );

      fields.push(generateCreateFieldObject(Comment.fields.Details, message));
      fields.push(
        generateCreateFieldObject(Comment.fields.CreatedByName, fullName)
      );
      fields.push(generateCreateFieldObject(Comment.fields.Avatar, Avatar));
      fields.push(generateCreateFieldObject(Comment.fields.CreatedDateTime)); //Set 2 hours in advanced of time found on the Mobile users phone (7:55 is actually 5:55)
    }
    return fields;
  };

  postCommentsBody = (busObRecId, message) => {
    return {
      parentBusObId: Incident.busObId,
      parentBusObRecId: busObRecId, //Put the selected ticket's RecID here
      relationshipId: Comment.relationshipId,
      busObId: Comment.busObId,
      fields: this.getSendCommentFields(message),
      persist: true,
    };
  };

  getResolveTicketFields = (status, closeTicketText) => {
    let fields = [];
    fields.push(generateCreateFieldObject(Incident.fields.Status, status));
    fields.push(generateCreateFieldObject(Incident.fields.Withdraw, true));
    fields.push(
      generateCreateFieldObject(
        Incident.fields.ShortDescription,
        closeTicketText
      )
    );
    return fields;
  };
}

let IncBody = new IncidentBody();
export default IncBody;

// , moment().subtract(2, 'hour').format("YYYY/MM/DD h:m:a")
