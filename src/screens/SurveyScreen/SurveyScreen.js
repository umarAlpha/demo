// import React, { Component } from 'react';
// import './SurveyScreen.css';

// import { Row, Col, Spinner } from 'react-bootstrap';
// import { MdRefresh } from 'react-icons/md';
// import Card from '../../components/CustomCard/CustomCard';
// import SurveyContainer from './SurveyContainer/SurveyContainer';

// import SurveyController from './SurveyController';

// import { getValueForFieldId } from '../../Utility/CommonMethods';
// import Survey from '../../BussinessObjects/Survey';

// class SurveyScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       surveys: [],
//       loading: true,
//     };
//   }
//   componentDidMount() {
//     this.getSurveys();
//   }

//   getSurveys = () => {
//     SurveyController.systemSurveys((res) => {
//       if (res.success === false) {
//         localStorage.clear();
//       } else {
//         this.setState({ loading: false });
//         let surveyarr = [];

//         if (res.data.businessObjects) {
//           for (let i = 0; i < res.data.businessObjects.length; i++) {
//             let title = getValueForFieldId(
//               Survey.fields.ParentShortDescription,
//               '',
//               res.data.businessObjects[i].fields
//             );
//             let description = getValueForFieldId(
//               Survey.fields.ParentRecordDescription,
//               '',
//               res.data.businessObjects[i].fields
//             );
//             let ParentPublicID = getValueForFieldId(
//               Survey.fields.ParentPublicID,
//               '',
//               res.data.businessObjects[i].fields
//             );
//             let RecID = getValueForFieldId(
//               Survey.fields.RecID,
//               '',
//               res.data.businessObjects[i].fields
//             );

//             let ParentRecID = getValueForFieldId(
//               Survey.fields.ParentRecID,
//               '',
//               res.data.businessObjects[i].fields
//             );

//             surveyarr.push({
//               description,
//               title,
//               parentpublicid: ParentPublicID,
//               recId: RecID,
//               ParentRecID,
//             });
//           }

//           this.setState({
//             surveys: surveyarr,
//           });
//         } else {
//           this.setState({ surveys: [] });
//         }
//       }
//     });
//   };

//   refreshHandler = () => {
//     this.setState({ surveys: [], loading: true });
//     this.getSurveys();
//   };

//   render() {
//     const { loading, surveys } = this.state;
//     return (
//       // <div className='surveyContainer'>
//       //   <Container fluid>
//       //     <Row className='no-gutters'>
//       //       <Col xl={7} lg={7} md={12} sm={12}>
//       <div>
//         Hello Surveys
//         {/* <Row>
//           <Col md={10} className='mx-auto'>
//             <div className='d-flex justify-content-between'>
//               <h5 className='survey-heading mb-3 w-100'>{`Surveys (${surveys.length})`}</h5>
//               <div style={{ cursor: 'pointer' }} onClick={this.refreshHandler}>
//                 <MdRefresh size={26} />
//               </div>
//             </div>
//             <div
//               style={{ overflowY: 'auto', overflowX: 'hidden' }}
//               className='height-25 over'
//             >
//               <Row className='right-margin'>
//                 {loading === true ? (
//                   <div className='text-center w-100'>
//                     <Spinner animation='border' size='md' color='#116eb7' />
//                   </div>
//                 ) : surveys === undefined || surveys.length <= 0 ? (
//                   <div>no data found!</div>
//                 ) : (
//                   this.state.surveys.map((item) => (
//                     <Col xl={6} lg={6} md={12} sm={12} key={Math.random()}>
//                       <Card>
//                         <SurveyContainer {...item} />
//                       </Card>
//                     </Col>
//                   ))
//                 )}
//               </Row>
//             </div>
//           </Col>
//         </Row> */}
//       </div>
//     );
//   }
// }

// export default SurveyScreen;
