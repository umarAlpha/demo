import React, { Component } from 'react';

import Accordion2 from '../../../components/Accordion2/Accordion2';
import SurveyModal from '../SurveyModal/SurveyModal';

class SurveyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      call: false,
      nextSurveyTitle: '',
      nextSurvey: null,
      nextSurveyState: false,
      prevSurvey : null
    };
  }

  componentDidMount() {
    this.getNextSurvey(this.props.id, false);
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.recid !== this.props.recid) {
      this.setState({ call: false });
    }
  }

  componentWillUnmount() {}

  modalOpenHandler = () => {
    this.setState({ modalShow: true, call: true });
    this.getNextSurvey(this.props.id)
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  getNextSurvey = (surveyId, next) => {
    let getItem = this.props.data.find((item) => {
      return item.id === surveyId;
    });

    let index = this.props.data.indexOf(getItem);
    this.setState({prevSurvey: this.props.data[index]})

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.title :'no more surveys' ;
      }

      if (!nextItem) {
        this.setState({ nextSurveyTitle: 'no more surveys' });
      } else {
        this.setState({
          nextSurvey: nextItem,
          nextSurveyTitle: next ? title : nextItem.title,
        });
      }
    }
  };

  nextSurveyStateHandler = () => {
    this.setState({ nextSurveyState: true });
  };


  render() {

    const { nextSurvey, nextSurveyTitle, prevSurvey, nextSurveyState } = this.state;
    
    return (
      <>
        <Accordion2 {...this.props} modalOpenHandler={this.modalOpenHandler} />
        <SurveyModal
          show={this.state.modalShow}
          onHide={this.modalCloseHandler}
          call={this.state.call}
          recid={this.props.recId}
          parentrecid={this.props.ParentRecID}
          refreshhandler={this.props.refreshhandler}
          prevSurvey = {prevSurvey}
          nextSurvey={nextSurvey}
          nextSurveyTitle={nextSurveyTitle}
          getNextSurvey={this.getNextSurvey}
          nextSurveyState={nextSurveyState}
          nextSurveyStateHandler={this.nextSurveyStateHandler}
          description={this.props.description}
        />
      </>
    );
  }
}

export default SurveyContainer;
