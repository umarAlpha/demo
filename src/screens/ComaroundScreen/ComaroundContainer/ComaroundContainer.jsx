import React, { Component } from 'react';
import '../../../styles/globalStyle.css';

import Accordian from '../../../components/CustomAccordion/CustomAccordion';
import ComaroundModal from '../ComaroundModal/ComaroundModal';

class ComaroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      activeId: 0,
      nextArticleTitle: '',
      nextArticle: null,
      nextArticleState: false,
      prevArticle: null
    };
  }

  componentDidMount() {
    // console.log("list or items ====>",this.props.list.id);
    this.getNextArticle(this.props.list.id, false);
    // this.nextArticle(this.props.list.title);
  }

  componentDidUpdate(preProps, preState) {
    if (preState.modalShow !== this.state.modalShow) {
      this.getNextArticle(this.props.list.id, false);
      this.setState({ nextArticleState: false });
    }
  }

  getNextArticle = (articleId, next) => {
    let getItem = this.props.data.find((item) => {
      return item.id === articleId;
    });
    //  console.log("GetItem", getItem);
    let index = this.props.data.indexOf(getItem);
    this.setState({prevArticle: this.props.data[index]})
    // console.log("Index", index);

    // console.log('Article => ', nextItem);

    if (index >= 0 && index <= this.props.data.length - 1) {
      let nextItem = this.props.data[index + 1];
      let nextItem2;
      let title;
      if (next && index <= this.props.data.length - 1) {
        nextItem2 = this.props.data[index + 1];
        title = nextItem2 ? nextItem2.title : 'no more articles';
      }
      // } else {
      //   title = 'No More Articles';
      // }
      if (!nextItem) {
        this.setState({ nextArticleTitle: 'no more articles' });
      } else {
        this.setState({
          nextArticle: nextItem,
          nextArticleTitle: next ? title : nextItem.title,
        });
      }
    }
  };

  nextArticleStateHandler = () => {
    this.setState({ nextArticleState: true });
  };

  modalOpenHandler = (id) => {
    this.setState({ modalShow: true });
  };

  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  // toggleActive = (id) => {
  //   console.log('toggle active');
  //   // console.log('toggle active => ', id);
  //   if (this.state.activeId === id) {
  //     this.setState({ activeId: 0 });
  //   } else {
  //     this.setState({ activeId: id });
  //   }
  // };
  componentWillUnmount() {}

  render() {
    const { nextArticle, nextArticleTitle, prevArticle, nextArticleState } = this.state;
    return (
      <>
        <Accordian
          modalOpenHandler={() => this.modalOpenHandler(this.props.list.id)}
          id={this.props.list.id}
          title={this.props.list.title}
          description={this.props.list.body}
          titleStyle='title'
          paragraphStyle='paragraph'
        />
        <ComaroundModal
          show={this.state.modalShow}
          onHide={this.modalCloseHandler}
          title={this.props.list.title}
          relevence={this.props.list.views}
          id={this.props.list.id}
          solutionRatio={this.props.list.solutionRatio}
          views={this.props.list.views}
          knowledgeState={this.props.list.knowledgeState}
          prevArticle = {prevArticle}
          nextArticle={nextArticle}
          nextArticleTitle={nextArticleTitle}
          refreshHandler={this.props.refreshHandler}
          getNextArticle={this.getNextArticle}
          getNextArticleType={this.getNextArticleType}
          nextArticleState={nextArticleState}
          nextArticleStateHandler={this.nextArticleStateHandler}
        />
      </>
    );
  }
}

export default ComaroundContainer;
