import WorkOrder from '../../BussinessObjects/WorkOrder';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo.js';
import Comment from '../../BussinessObjects/Comment';
import {
  getValueForFieldId,
  generateCreateFieldObject,
  generateSortingObject,
  generateFieldObject,
} from '../../Utility/CommonMethods';

class WorkOrderBody {
  getFilters = (WorkOrderStatuses) => {
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
        generateCreateFieldObject(
          WorkOrder.fields.CustomerDisplayName,
          fullName
        )
      );

      WorkOrderStatuses.map((status) => {
        return filters.push(
          generateCreateFieldObject(WorkOrder.fields.Status, status)
        );
      });
    }

    return filters;
  };

  allWorkOrdersBody = (page, perPage) => {
    return {
      busObId: WorkOrder.busObId,
      fields: Object.values(WorkOrder.fields),
      filters: this.getFilters(WorkOrder.allWorkOrderStatuses),
      pageNumber: page,
      pageSize: perPage,
      sorting: [generateSortingObject(WorkOrder.fields.lastModifiedDate, 0)],
    };
  };

  allWorkOrdersBodyBySearch = (search) => {
    return {
      busObId: WorkOrder.busObId,
      searchText: search,
      fields: Object.values(WorkOrder.fields),
      filters: this.getFilters(WorkOrder.allWorkOrderStatuses),
      sorting: [generateSortingObject(WorkOrder.fields.lastModifiedDate, 0)],
    };
  };

  openWorkOrderBody = () => {
    return {
      busObId: WorkOrder.busObId,
      fields: Object.values(WorkOrder.fields),
      filters: this.getFilters(WorkOrder.openWorkOrderStatuses),
      sorting: [generateSortingObject(WorkOrder.fields.lastModifiedDate, 0)],
    };
  };

  closeWorkOrderBody = () => {
    return {
      busObId: WorkOrder.busObId,
      fields: Object.values(WorkOrder.fields),
      filters: this.getFilters(WorkOrder.closedWorkOrderStatuses),
      sorting: [generateSortingObject(WorkOrder.fields.lastModifiedDate, 0)],
    };
  };

  getCommentsFieldLists = () => {
    let FieldLists = [];

    FieldLists.push(Comment.fields.Details);
    FieldLists.push(Comment.fields.CreatedByName);
    FieldLists.push(Comment.fields.CreatedDateTime);
    FieldLists.push(Comment.fields.JournalType);
    FieldLists.push(Comment.fields.Avatar);

    return FieldLists;
  };

  getCommentsBodyFilters = () => {
    let Filters = [];
    Filters.push(
      generateFieldObject(Comment.fields.JournalType, 'Journal - Comment', 'eq')
    );
    return Filters;
  };

  getCommentsBody = (recId) => {
    return {
      parentBusObId: WorkOrder.busObId,
      parentBusObRecId: recId,
      relationshipId: Comment.workOrderRelationshipId,
      fieldsList: this.getCommentsFieldLists(),
      filters: this.getCommentsBodyFilters(),
      pageNumber: 1,
      pageSize: 150,
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

  postCommentsBody = (busObRecId, message) => {
    return {
      parentBusObId: WorkOrder.busObId,
      parentBusObRecId: busObRecId, //Put the selected ticket's RecID here
      relationshipId: Comment.workOrderRelationshipId,
      busObId: Comment.busObId,
      fields: this.getSendCommentFields(message),
      persist: true,
    };
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
}

let WorkBody = new WorkOrderBody();
export default WorkBody;

// , moment().subtract(2, 'hour').format("YYYY/MM/DD h:m:a")
