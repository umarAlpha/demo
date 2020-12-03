import React, { Component } from 'react';
import './CreateTicketScreen.css';

// components

import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Button } from 'react-bootstrap';
import classnames from 'classnames';

import Card from '../../components/CustomCard/CustomCard';

import ClassificationCatelog from '../../components/ClassificationCatelog/ClassificationCatelog';

import Accordian2 from '../../components/Accordion2/Accordion2';
import Overflow from '../../components/OverflowScroll/OverflowScroll';
import Input from '../../components/CustomInput/CustomInput';


// controllers
// import ClassificationsController from '../CreateIncidentController';
import { getValueForFieldId } from '../../Utility/CommonMethods';
import IncidentCategory from '../../BussinessObjects/IncidentCategory';
import IncidentSubCategory from '../../BussinessObjects/IncidentSubCategory';
import IncidentService from '../../BussinessObjects/IncidentService';

// controllers
import ClassificationsController from './CreateIncidentController';


class CreateTicketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      attachments: [],
      modalShow: false,

      classificationsValues: null,

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
      spinner: false,
      spinnerState: false,
      spinnerState2: false,

      launch: '',

      activeId: 0,
      activeId1: 0,
      activeId2: 0,
    };
  }

  componentDidMount() {
    this.getServices();
    const { location } = this.props.history;
    if (location.state) {
      const { state } = location;
      // console.log(state);
      if (location.state.url) window.open(state.url, '_blank');
      this.setState({
        classificationsValues: {
          selectService: !state.service ? '' : state.service,
          selectCategory: !state.category ? '' : state.category,
          selectSubCategory: !state.subcat ? '' : state.subcat,
        },
      });
    }
  }

  componentDidUpdate(preProps, preState) {
    // if (preState.services.length !== this.state.services.length) {}
  }

  componentWillUnmount() {}

  getServices = () => {
    ClassificationsController.getServices((res) => {
      if (res.success === false) {
        localStorage.clear();
      } else {
        if (res.data.businessObjects) {
          this.setState({ spinner: false });
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
          console.log(res.data.businessObjects);

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
            let launch = getValueForFieldId(
              IncidentSubCategory.fields.launchUrl,
              '',
              res.data.businessObjects[i].fields
            );

            subarr.push({
              SubcategoryName,
              IncidentType,
              SpecificName,
              id,
              launch,
            });
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

  chooseService = (value, recid, id) => {
    this.setState({
      spinnerState: true,
      selectService: value,
      page: 2,
      activeId: id,
    });
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
      activeId1: id,
    });
    this.getSubCategories(recid, (res) => {
      if (res === true) {
        this.setState({ spinnerState2: false });
      }
    });
  };

  chooseSubCategory = (item, id) => {
    // console.log(item);
    this.setState({
      activeId2: id,
      selectSubCategory: item.SubcategoryName,
      incidentType: item.IncidentType,
      specificName: item.SpecificName,
      btn: true,
      launch: item.launch,
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
        // console.log();
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
            // activeId1: 143,
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
          this.setState({
            services: [{ id: 1, ServiceName: obj.ServiceName }],
            categories: [{ id: 2, CategoryName: obj.CategoryName }],
            subCategories: [{ id: 3, SubcategoryName: item.publicId }],
            activeId: 1,
            activeId1: 2,
            activeId2: 3,
            page: 2,
            page: 3,
            selectService: obj.ServiceName,
            selectCategory: obj.CategoryName,
            selectSubCategory: item.publicId,
            incidentType: obj.IncidentType,
            specificName: obj.SpecificName,
            showSuggestions: false,
            btn: true,
          });
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

  openUrl = () => {
    window.open(this.state.launch, '_blank');
  };

  modalOpenHandler = () => {
    this.setState({ modalShow: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectAttachment = (e) => {
    let file = e.target.files[0];
    if (file === undefined) {
      console.log('null selected');
      return null;
    } else {
      let name = e.target.files[0].name;
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          attachments: [
            ...this.state.attachments,
            { id: Math.random(), src: reader.result, name: name, file: file },
          ],
        });
      };
      reader.readAsDataURL(e.target.files[0], e.target.files[0].name);
    }
  };

  removeAttachments = (id) => {
    this.setState({
      attachments: this.state.attachments.filter((item) => item.id !== id),
    });
  };

  gettingValues = (values) => {
    this.setState({ classificationsValues: values });
  };

  closeCatalogDropdown = () => {
    this.setState({
      services: [...this.state.services2],
      page: 1,
      showSuggestions: false,
      spinnerStateCatalog: false,
      classificationCatalogData: [],
      catalogSearchText: '',
      btn: false,
    });
  };

  // submitIncident = (e) => {
  //   e.preventDefault();
  //   const {
  //     attachments,
  //     classificationsValues,
  //     title,
  //     description,
  //     recIdFind,
  //   } = this.state;
  //   // this.fetchSpecificFormElement(
  //   //   this.state.base_url + classificationsValues.specificName
  //   // );

  //   if (
  //     !classificationsValues ||
  //     !classificationsValues.selectSubCategory ||
  //     !title ||
  //     !description
  //   ) {
  //     this.setState({ modalShow2: true });
  //     setTimeout(() => {
  //       this.setState({ modalShow2: false });
  //     }, [1000]);
  //   } else {
  //     // this.setState({ spinnerState: true });

  //     // this.fetchRecIdWithHtml(
  //     //   this.state.base_url + classificationsValues.specificName
  //     // );
  //     this.setState({ submitSpinner: true });

  //     ClassificationsController.createIncident(
  //       classificationsValues,
  //       title,
  //       description,
  //       (res) => {
  //         console.log(res);
  //         if (res.success) {
  //           // let busObPublicId = res.data.busObPublicId;
  //           let busObRecId = res.data.busObRecId;
  //           // let incidentBusObId = Incident.busObId;
  //           // let incidentRelationShipId = Incident.relationShipId;
  //           // let SpecificTypeId = IncidentSubCategory.fields.SpecificTypeId;

  //           if (attachments.length > 0) {
  //             for (let i = 0; i < attachments.length; i++) {
  //               let file = attachments[i].file;
  //               MyIncidentController.postIncidentRelatedAttachments(
  //                 file,
  //                 busObRecId,
  //                 (res) => {
  //                   console.log('Attachment post ===>', res);
  //                 }
  //               );
  //             }
  //           }

  //           // ClassificationsController.linkSpecificFormToIncident(incidentBusObId,busObRecId,incidentRelationShipId,SpecificTypeId,recIdFind,(res) => {
  //           //   console.log(res, " <==== link form");
  //           // });

  //           this.setState({ modalShow1: true });
  //           setTimeout(() => {
  //             this.setState({ modalShow1: false });
  //             this.props.history.push('/myticket');
  //           }, 1000);

  //           // this.props.history.push({
  //           //   pathname: '/mytickets',
  //           //   hideHeadingTop: false,
  //           // });
  //           // this.setState({ spinnerState: false });
  //         } else {
  //           this.setState({ submitSpinner: true });
  //           alert('Not Submitted');
  //           // this.setState({ spinnerState: false });
  //         }
  //       }
  //     );
  //   }
  // };

  submitHanlder = (e) => {
    this.setState({ modalShow1: true });
  };

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
    return (
      <div className='w-100 position-relative'>
        <div className='d-flex align-items-center justify-content-between'>
          <h4>Classification</h4>
          <div className='w-50'>
            <Input
              type='text'
              placeholder='Search Classification Catalog'
              className='selection-input bor-5'
              value={catalogSearchText}
              onChange={(e) => this.catalogInput(e)}
              onKeyPressCapture={(e) => this.getClassificationCatalog(e)}
              show={classificationCatalogData.length > 0}
              closeCatalogDropdown={this.closeCatalogDropdown}
              searchIconHandler={() =>
                this.getClassificationCatalog({ key: 'Enter' })
              }
            />
            <ClassificationCatelog
              showSuggestions={showSuggestions}
              spinnerStateCatalog={spinnerStateCatalog}
              classificationCatalogData={classificationCatalogData}
              getCatalogSearchItem={this.searchCatalogClick}
            />
          </div>
        </div>
        <div className='p-2'>
          <Row>
            <Col md={4}>
              <Card className='height-23'>
                <h6 className='text-secondary font-weight-bold text-capitalize'>
                  Services
                </h6>
                <Overflow>
                  {services.length <= 0 ? (
                    <div className='text-center w-100'>
                      <Spinner animation='border' size='md' variant='primary' />
                    </div>
                  ) : (
                    <>
                      {services.map((item) => (
                        <div className='my-3 bor-b'>
                          <Accordian2
                            key={item.id}
                            id={item.id}
                            title={item.ServiceName}
                            // description={item.ServiceDescription}
                            titleStyle='title p-2'
                            icon
                            modalOpenHandler={() =>
                              this.chooseService(
                                item.ServiceName,
                                item.recid,
                                item.id
                              )
                            }
                            active={this.state.activeId === item.id}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </Overflow>
              </Card>
            </Col>
            {(page === 2 || page === 3) && (
              <Col md={4}>
                <Card
                  className={classnames('height-23', {
                    'card-animation': page === 2,
                    // 'card-animation-out': this.props.page === 0,
                  })}
                >
                  <h6 className='text-secondary font-weight-bold text-capitalize'>
                    Category
                  </h6>
                  <Overflow>
                    {spinnerState ? (
                      <div className='text-center w-100'>
                        <Spinner
                          animation='border'
                          size='md'
                          variant='primary'
                        />
                      </div>
                    ) : categories.length <= 0 ? (
                      <div className='text-center text-dark'>
                        <h4>Category not Found!</h4>
                      </div>
                    ) : (
                      <>
                        {categories.map((item) => (
                          <div className='my-3 bor-b'>
                            <Accordian2
                              key={item.id}
                              id={item.id}
                              title={item.CategoryName}
                              icon
                              titleStyle='title p-2'
                              modalOpenHandler={() =>
                                this.chooseCategory(
                                  item.CategoryName,
                                  item.recId,
                                  item.id
                                )
                              }
                              active={this.state.activeId1 === item.id}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </Overflow>
                </Card>
              </Col>
            )}
            {page === 3 && (
              <Col md={4}>
                <Card
                  className={classnames('height-23', {
                    'card-animation': page === 3,
                    // 'card-animation-out': this.props.page === 0,
                  })}
                >
                  <h6 className='text-secondary font-weight-bold text-capitalize'>
                    SubCategories
                  </h6>
                  <Overflow>
                    {spinnerState2 ? (
                      <div className='text-center w-100'>
                        <Spinner
                          animation='border'
                          size='md'
                          variant='primary'
                        />
                      </div>
                    ) : subCategories.length === 0 ? (
                      <div className='text-center text-dark'>
                        <h4>Category not Found!</h4>
                      </div>
                    ) : (
                      <>
                        {subCategories.map((item) => (
                          <div className='my-3 bor-b'>
                            <Accordian2
                              key={item.id}
                              id={item.id}
                              title={item.SubcategoryName}
                              icon
                              titleStyle='title p-2'
                              modalOpenHandler={() =>
                                this.chooseSubCategory(item, item.id)
                              }
                              active={this.state.activeId2 === item.id}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </Overflow>
                </Card>
              </Col>
            )}
            {/* {page === 1 && (
              <Col md={8}>
                <div className='d-flex flex-column-reverse'>
                  <img
                    src={require('../../assets/images/illustration.png')}
                    alt='selectionpicture'
                    className='img-fluid'
                  />
                </div>
              </Col>
            )} */}
          </Row>
          <div className='text-right mt-2'>
            {btn && <Button onClick={this.openUrl}>Submit</Button>}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTicketScreen;
