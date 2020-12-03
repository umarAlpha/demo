import React, { Component } from 'react';
// import './CreateTicketModal.css';

import {Images} from '../../../assets/Assets';

import classnames from 'classnames';

import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import Card from '../../../components/CustomCard/CustomCard';

import ClassificationCatelog from '../../../components/ClassificationCatelog/ClassificationCatelog';
import Accordian from '../../../components/CustomAccordion/CustomAccordion';
import Accordian2 from '../../../components/Accordion2/Accordion2';
import Overflow from '../../../components/OverflowScroll/OverflowScroll';
import Input from '../../../components/CustomInput/CustomInput';
import { FaTimes } from 'react-icons/fa';

// controllers
import ClassificationsController from '../CreateIncidentController';
import { getValueForFieldId } from '../../../Utility/CommonMethods';
import IncidentCategory from '../../../BussinessObjects/IncidentCategory';
import IncidentSubCategory from '../../../BussinessObjects/IncidentSubCategory';
import IncidentService from '../../../BussinessObjects/IncidentService';

class CreateTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      services2: [],

      subCategoryInformation: {},
      categories: [],
      categories2: [],

      subCategories: [],

      showSuggestions: false,
      spinnerStateCatalog: false,

      selectService: '',
      selectCategory: '',

      selectSubCategory: '',
      incidentType: '',
      specificName: '',

      page: 1,
      btn: false,
      catalogSearchText: '',
      classificationCatalogData: [],
      spinnerState: false,
      spinnerState2: false,

      activeId: 0,
      activeId1: 0,
      activeId2: 0,
    };
  }

  componentDidMount() {
    this.getServices();
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.show !== this.props.show) {
      this.setState({
        services: [...this.state.services2],
        page: 1,
        selectService: '',
        selectCategory: '',
        selectSubCategory: '',
        categories: [],
        subCategories: [],
        classificationCatalogData: [],
        catalogSearchText: '',
        btn: false,
      });
    }
  }
  componentWillUnmount() {}

  getServices = () => {
    ClassificationsController.getServices((res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        if (res.data.businessObjects) {
          let arrservice = [];
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let busObRecId = res.data.businessObjects[i].busObRecId;

            let id = Math.random();
            let ServiceName = getValueForFieldId(
              IncidentService.fields.ServiceName,
              '',
              res.data.businessObjects[i].fields
            );
            let ServiceDescription = getValueForFieldId(
              IncidentService.fields.ServiceDescription,
              '',
              res.data.businessObjects[i].fields
            );
            let LinkedImage = getValueForFieldId(
              IncidentService.fields.LinkedImage,
              '',
              res.data.businessObjects[i].fields
            );

            arrservice.push({
              ServiceName: ServiceName,
              ServiceDescription: ServiceDescription,
              LinkedImage: LinkedImage,
              id: id,
              recid: busObRecId,
            });
          }
          this.setState({ services: arrservice, services2: arrservice });
        } else {
          this.setState({ services: [] });
        }
      }
    });
  };

  getCategories = (servicesRecId, callback) => {
    ClassificationsController.getCategories(servicesRecId, (res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        if (res.data.businessObjects) {
          // this.setState({ categories: [] });
          let arrcat = [];

          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let busObRecId = res.data.businessObjects[i].busObRecId;

            // let ServiceRecId = getValueForFieldId(
            //   IncidentCategory.fields.ServiceRecId,
            //   '',
            //   res.data.businessObjects[i].fields
            // );

            // if (ServiceRecId === servicesRecId) {
            let id = Math.random();
            // let ServiceName = getValueForFieldId(
            //   IncidentCategory.fields.ServiceName,
            //   '',
            //   res.data.businessObjects[i].fields
            // );
            let CategoryName = getValueForFieldId(
              IncidentCategory.fields.CategoryName,
              '',
              res.data.businessObjects[i].fields
            );

            arrcat.push({
              // ServiceName: ServiceName,
              CategoryName: CategoryName,
              // ServiceRecId: ServiceRecId,
              id: id,
              recId: busObRecId,
            });
            // }
          }
          this.setState({ categories: arrcat, categories2: arrcat });
          callback(true);
        } else {
          this.setState({ categories: [] });
          callback(false);
        }
      }
    });
  };

  getSubCategories = (categoryRecId, callback) => {
    ClassificationsController.getSubCategories(categoryRecId, (res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        // this.setState({ subCategoryInformation: res.data });
        let subarr = [];

        if (res.data.businessObjects) {
          // this.setState({ subCategories: [] });

          for (let i = 0; i < res.data.businessObjects.length; i++) {
            let id = Math.random();
            let SubcategoryName = getValueForFieldId(
              IncidentSubCategory.fields.SubcategoryName,
              '',
              res.data.businessObjects[i].fields
            );
            let IncidentType = getValueForFieldId(
              IncidentSubCategory.fields.IncidentType,
              '',
              res.data.businessObjects[i].fields
            );
            let SpecificName = getValueForFieldId(
              IncidentSubCategory.fields.SpecificName,
              '',
              res.data.businessObjects[i].fields
            );

            subarr.push({ SubcategoryName, IncidentType, SpecificName, id });
          }
          this.setState({ subCategories: subarr });
          callback(true);
        } else {
          this.setState({ subCategories: [] });
          callback(false);
        }
      }
    });
  };

  chooseService = (value, recid) => {
    this.setState({ spinnerState: true, selectService: value, page: 2 });
    this.getCategories(recid, (res) => {
      if (res === true) {
        this.setState({ spinnerState: false });
      }
    });
  };

  chooseCategory = (value, recid, id) => {
    this.setState({
      spinnerState2: true,
      selectCategory: value,
      page: 3,
      activeId: id,
    });
    this.getSubCategories(recid, (res) => {
      if (res === true) {
        this.setState({ spinnerState2: false });
      }
    });
  };

  chooseSubCategory = (item, id) => {
    console.log(id);
    // console.log(item);
    this.setState({
      activeId1: id,
      selectSubCategory: item.SubcategoryName,
      incidentType: item.IncidentType,
      specificName: item.SpecificName,
      btn: true,
    });
  };

  catalogInput = (e) => {
    this.setState({ catalogSearchText: e.target.value });
    if (e.target.value === '') {
      this.setState({
        showSuggestions: false,
        classificationCatalogData: [],
        spinnerStateCatalog: false,
      });
    }
  };

  getClassificationCatalog = (e) => {
    if (e.key === 'Enter') {
      this.setState({ showSuggestions: true, spinnerStateCatalog: true });
      ClassificationsController.quickSearchClassification(
        this.state.catalogSearchText,
        (res) => {
          if (res.success === false) {
            localStorage.clear();
          } else {
            console.log('RES ==>> ', res);
            var group = res.data.groups;
            if (
              group === undefined ||
              group.length === undefined ||
              group.length <= 0
            ) {
              this.setState({ spinnerStateCatalog: true });
              return;
            } else {
              this.setState({
                classificationCatalogData: [],
                spinnerStateCatalog: false,
              });
              for (let i = 0; i < group.length; i++) {
                let title = group[i].title;
                if (group[i].simpleResultsListItems.length > 0) {
                  for (
                    let j = 0;
                    j < group[i].simpleResultsListItems.length;
                    j++
                  ) {
                    let publicId = group[i].simpleResultsListItems[j].publicId;
                    let busObRecId =
                      group[i].simpleResultsListItems[j].busObRecId;
                    this.setState({
                      classificationCatalogData: [
                        ...this.state.classificationCatalogData,
                        {
                          title: title,
                          publicId: publicId,
                          busObRecId: busObRecId,
                        },
                      ],
                    });
                  }
                }
              }
            }
          }
        }
      );
    }
  };

  searchCatalogClick = (item) => {
    console.log('item => ', item);
    // console.log('services state => ', this.state.services);
    if (item.title === 'Services') {
      this.setState({
        services: this.state.services2.filter(
          (i) => i.ServiceName === item.publicId
        ),
        selectService: item.publicId,
        page: 2,
        showSuggestions: false,
      });
      this.getCategories(item.busObRecId, (res) => {
        if (res === true) {
          this.setState({ spinnerState: false });
        }
      });
    } else if (item.title === 'Incident Categories') {
      this.getServiceFromCategory(item.publicId, (serviceName) => {
        console.log();
        if (serviceName !== '') {
          // console.log(
          //   this.state.categories2.filter(
          //     (i) => i.CategoryName === item.publicId
          //   )
          // );
          this.setState({
            services: this.state.services2.filter(
              (i) => i.ServiceName === serviceName
            ),
            categories: [{ CategoryName: item.publicId, id: Math.random() }],
            selectService: serviceName,
            selectCategory: item.publicId,
            page: 3,
            showSuggestions: false,
          });
          this.getSubCategories(item.busObRecId, (res) => {
            if (res === true) {
              this.setState({ spinnerState2: false });
            }
          });
        }
      });
    } else if (item.title === 'Incident SubCategories') {
      this.getServiceCategoryWithSubCategory(item.publicId, (obj) => {
        if (obj !== undefined || obj != null) {
          console.log('Obj ==>>> ', obj);
          this.setState(
            {
              selectService: obj.ServiceName,
              selectCategory: obj.CategoryName,
              selectSubCategory: item.publicId,
              incidentType: obj.IncidentType,
              specificName: obj.SpecificName,
              showSuggestions: false,
            },
            () => {
              this.doneAll();
            }
          );
        }
      });
    }
  };

  getServiceFromCategory = (c_name, callback) => {
    ClassificationsController.serviceFromCategory(c_name, (res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        if (res.data.businessObjects) {
          var ServiceName;
          for (let i = 0; i < res.data.businessObjects.length; i++) {
            ServiceName = getValueForFieldId(
              IncidentCategory.fields.ServiceName,
              '',
              res.data.businessObjects[i].fields
            );
            callback(ServiceName);
          }
        } else {
          callback(ServiceName);
        }
      }
    });
  };

  getServiceCategoryWithSubCategory = (subcat_name, callback) => {
    ClassificationsController.serviceCategoryFromSubCategory(
      subcat_name,
      (res) => {
        if (res.success === false) {
          localStorage.clear();
        } else {
          if (res.data.businessObjects) {
            var ServiceName, CategoryName, SpecificName, IncidentType;
            for (let i = 0; i < res.data.businessObjects.length; i++) {
              ServiceName = getValueForFieldId(
                IncidentSubCategory.fields.ServiceName,
                '',
                res.data.businessObjects[i].fields
              );
              CategoryName = getValueForFieldId(
                IncidentSubCategory.fields.CategoryName,
                '',
                res.data.businessObjects[i].fields
              );
              SpecificName = getValueForFieldId(
                IncidentSubCategory.fields.SpecificName,
                '',
                res.data.businessObjects[i].fields
              );
              IncidentType = getValueForFieldId(
                IncidentSubCategory.fields.IncidentType,
                '',
                res.data.businessObjects[i].fields
              );

              callback({
                ServiceName,
                CategoryName,
                SpecificName,
                IncidentType,
              });
            }
          } else {
            callback({ ServiceName, CategoryName, SpecificName, IncidentType });
          }
        }
      }
    );
  };

  doneAll = () => {
    const {
      selectService,
      selectCategory,
      selectSubCategory,
      incidentType,
      specificName,
    } = this.state;
    if (
      selectService !== '' &&
      selectCategory !== '' &&
      selectSubCategory !== ''
    ) {
      this.props.getClassification({
        selectService,
        selectCategory,
        selectSubCategory,
        incidentType,
        specificName,
      });
      this.setState({
        services: [...this.state.services2],
        categories2: [...this.state.categories2],
        page: 1,
        selectService: '',
        selectCategory: '',
        selectSubCategory: '',
        categories: [],
        subCategories: [],
        classificationCatalogData: [],
        catalogSearchText: '',
        btn: false,
      });
      this.props.onHide();
    }
  };

  closeCatalogDropdown = () => {
    this.setState({
      services: [...this.state.services2],
      page: 1,
      showSuggestions: false,
      spinnerStateCatalog: false,
      classificationCatalogData: [],
      catalogSearchText: '',
    });
  };

  // toggleActive = (id) => {
  //   this.setState({ activeId: id });
  // };

  render() {
    const {
      services,
      categories,
      subCategories,
      showSuggestions,
      spinnerStateCatalog,
      classificationCatalogData,
      catalogSearchText,
      page,
      spinnerState,
      spinnerState2,
      btn,
    } = this.state;

    // const { onHide } = this.props;
    // console.log('categories => ', categories);

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        centered
        // backdrop='static'
        keyboard={false}
        size='xl'
      >
        <Modal.Header className='d-flex justify-content-center'>
            <img src={Images.logo} alt='modal-pic' className='w-25' />
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateTicketModal;
