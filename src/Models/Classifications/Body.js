import Incident from '../../BussinessObjects/Incident';
import CustomerUserInfo from '../../BussinessObjects/CustomerUserInfo';
import IncidentService from '../../BussinessObjects/IncidentService';
import IncidentCategory from '../../BussinessObjects/IncidentCategory';
import IncidentSubCategory from '../../BussinessObjects/IncidentSubCategory';
import {
  generateCreateFieldObject,
  generateSortingObject,
  getValueForFieldId,
  generateFieldObject,
} from '../../Utility/CommonMethods';

class ClassificationsBody {
  getFilters = (status) => {
    let filters = [];
    filters.push(generateFieldObject(IncidentService.fields.Status, status));
    // filters.push(generateFieldObject(IncidentService.fields.CitizenResponse, false));
    return filters;
  };

  getCategoryFilter = (servicesRecId) => {
    let filters = [];
    filters.push(
      generateFieldObject(IncidentCategory.fields.ServiceRecId, servicesRecId)
    );
    return filters;
  };

  getSubCategoryFilter = (categoryRecId) => {
    let filters = [];
    filters.push(
      generateFieldObject(
        IncidentSubCategory.fields.CategoryRecID,
        categoryRecId
      )
    );
    return filters;
  };

  getServiceFromNameFilters = (c_name) => {
    let filters = [];
    filters.push(
      generateFieldObject(IncidentCategory.fields.CategoryName, c_name)
    );
    return filters;
  };

  getServiceCategoryWithSubCategoryFilters = (subCategoryName) => {
    let filters = [];
    filters.push(
      generateFieldObject(
        IncidentSubCategory.fields.SubcategoryName,
        subCategoryName
      )
    );
    return filters;
  };

  getCreateIncidentFields = (classificationsValues, title, description) => {
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

      fields.push(
        generateCreateFieldObject(
          Incident.fields.Service,
          classificationsValues.selectService
        )
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.Category,
          classificationsValues.selectCategory
        )
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.SubCategory,
          classificationsValues.selectSubCategory
        )
      );
      fields.push(
        generateCreateFieldObject(
          Incident.fields.IncidentType,
          classificationsValues.incidentType
        )
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.Impact, 'Should Have')
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.Urgency, 'Standard')
      );
      fields.push(generateCreateFieldObject(Incident.fields.Priority, '3'));
      fields.push(
        generateCreateFieldObject(Incident.fields.ShortDescription, title)
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.Description, description)
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.CustomerDisplayName, fullName)
      );
      fields.push(generateCreateFieldObject(Incident.fields.Status, 'New'));
      fields.push(
        generateCreateFieldObject(Incident.fields.OwnedByTeam, 'Service Desk')
      );
      fields.push(
        generateCreateFieldObject(Incident.fields.CallSource, 'Mobile')
      );
    }

    return fields;
  };

  servicesBody = () => {
    return {
      busObId: IncidentService.busObId,
      fields: Object.values(IncidentService.fields),
      filters: this.getFilters('Active'),
      sorting: [generateSortingObject(IncidentService.fields.ServiceName, 1)],
    };
  };

  categoryBody = (servicesRecId) => {
    return {
      busObId: IncidentCategory.busObId,
      fields: Object.values(IncidentCategory.fields),
      filters: this.getCategoryFilter(servicesRecId),
      sorting: [generateSortingObject(IncidentCategory.fields.CategoryName, 1)],
    };
  };

  subCategoryBody = (categoryRecId) => {
    return {
      busObId: IncidentSubCategory.busObId,
      fields: Object.values(IncidentSubCategory.fields),
      filters: this.getSubCategoryFilter(categoryRecId),
      sorting: [
        generateSortingObject(IncidentSubCategory.fields.SubcategoryName, 1),
      ],
    };
  };

  getClassificationServiceWithSelection = (CategoryName) => {
    return {
      busObId: IncidentCategory.busObId,
      fields: [
        IncidentCategory.fields.ServiceName,
        IncidentCategory.fields.ServiceRecId,
      ],
      filters: this.getServiceFromNameFilters(CategoryName),
      sorting: [generateSortingObject(IncidentCategory.fields.ServiceName, 1)],
    };
  };

  getClassificationServiceCategoryWithSelection = (subCategoryName) => {
    return {
      busObId: IncidentSubCategory.busObId,
      fields: [
        IncidentSubCategory.fields.CategoryName,
        IncidentSubCategory.fields.CategoryRecID,
        IncidentSubCategory.fields.ServiceName,
        IncidentSubCategory.fields.ServiceRecID,
        IncidentSubCategory.fields.launchUrl
      ],
      filters: this.getServiceCategoryWithSubCategoryFilters(subCategoryName),
      sorting: [
        generateSortingObject(IncidentSubCategory.fields.CategoryName, 1),
      ],
    };
  };

  quickClassificationResult = (searchVal) => {
    return {
      busObIds: [
        IncidentService.busObId,
        IncidentCategory.busObId,
        IncidentSubCategory.busObId,
      ],
      searchText: searchVal,
    };
  };

  createIncidentBody = (classificationsValues, title, description) => {
    return {
      busObId: Incident.busObId,
      fields: this.getCreateIncidentFields(
        classificationsValues,
        title,
        description
      ),
      persist: true,
    };
  };
}

let ClassificationBody = new ClassificationsBody();
export default ClassificationBody;
