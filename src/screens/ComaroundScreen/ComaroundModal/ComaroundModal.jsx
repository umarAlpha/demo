import React, { Component } from 'react';
import './ComaroundModal.css';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames'

import { Modal, Button } from 'react-bootstrap';
import { AiTwotoneLike } from 'react-icons/ai';
import RequestModal from '../RequestSubmitModal/RequestSubmitModal';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';
import Context from '../../../ContextApi/CountsContext/context';

// controllers
import ComController from '../ComAroundController';

class ComaroundModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successModal: false,
      requestModal: false,
      markup: '',
      nextArticleState: false,
      nextArticleTitle: '',
      modalTitle: '',
      submitError: false
    };
  }

  componentDidMount() {
    // console.log('Props', this.props);
    this.getItemMarkUp(this.props.id);
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.show !== this.props.show) {
      this.getItemMarkUp(this.props.id);
    }
  }

  // componentWillUnmount() {}

  getItemMarkUp(id) {
    // let id = this.props.id;
    ComController.getContentData(id, (res) => {
      this.setState({
        markup: res.data.translations[0].articlePartViewModels[0].markup,
      });
    });
  }

  rawMarkup() {
    // console.log('markup ===== ', this.state.markup);
    let rawMarkup = this.state.markup;
    return { __html: rawMarkup };
  }

  submitVote = () => {
    let id = this.props.id;
    ComController.contentVoteSubmitted(id, (res) => {
      if (res.success) {
        this.setState({
          successModal: true,
          modalTitle: 'Thanks for Feedback',
        });
        // this.props.onHide();
      } else {
        this.setState({
          successModal: true,
          requestModal: false,
          modalTitle: 'Internal Server Error',
        });
      }
    });
  };

  submitFormValues = (obj) => {
    let id = this.props.id;
    ComController.contentFormReasonSubmitted(id, obj, (res) => {
      if (res.success) {
        this.setState({
          successModal: true,
          requestModal: false,
          modalTitle: 'Thanks for Feedback',
        });
        setTimeout(() => {
          this.setState({ successModal: false });
          this.props.onHide();
        }, [1000]);
      } else {
        this.setState({
          successModal: true,
          requestModal: false,
          modalTitle: 'Internal Server Error',
          submitError: true
        });
        setTimeout(() => {
          this.setState({ successModal: false });
        }, [1000]);
      }
    });
  };

  nextArt = () => {
    const { nextArticle } = this.props;
    // console.log('nextarticle ====>', nextArticle);
    if (nextArticle !== undefined || nextArticle !== {}) {
      // this.setState({ nextArticleState: true });
      this.props.nextArticleStateHandler();
      this.getItemMarkUp(nextArticle.id);
      // if (nextArticle.id !== this.props.id) {
      this.props.getNextArticle(nextArticle.id, true);
      // } else {
      //   this.props.getNextArticle(nextArticle.id)
      // }
      // this.props.getNextArticleTitle(nextArticle.id);
      // this.props.getNextArticle()
    }
  };

  modalOpenHandler = () => {
    this.setState({ requestModal: true });
  };

  render() {
    const {
      title,
      views,
      knowledgeState,
      nextArticleTitle,
      prevArticle,
      solutionRatio,
      nextArticleState
    } = this.props;

    return (
      <>
        <Modal
          {...this.props}
          size='xl'
          aria-labelledby='contained-modal-comaround-vcenter'
          className='cmodal'
          centered
          scrollable={false}
        >
          <Modal.Header className='cmodal-header' closeButton>
            <Modal.Title className='cmodel-title'>
              <h5>{nextArticleState === true ? prevArticle.title : title}</h5>
            </Modal.Title>
          </Modal.Header>
          <img
            src={require('../../../assets/images/modalpic.png')}
            alt='modal'
            className='img-fluid cmodal-pic'
          />
          <Modal.Body className='cmodel-content cmodal-body'>
            <div className='d-flex align-items-center c-icons justify-content-between px-2'>
              <div>
                <div>
                  <AiTwotoneLike color='#126eb7' size={22} />
                  <span className='d-inline-block ml-1 font-weight-bold'>
                    {nextArticleState === true
                      ? prevArticle.solutionRatio
                      : solutionRatio}
                  </span>
                  <img
                    src={require('../../../assets/images/eye.png')}
                    alt='eye'
                    className='d-inline-block img-fluid eye ml-2'
                  />
                  <span className='d-inline-block ml-1 font-weight-bold'>
                    {nextArticleState === true ? prevArticle.views : views}
                  </span>
                  {this.props.knowledgeState && (
                    <span
                      className={`d-inline-block ml-1 ${this.props.knowledgeState === 'published'
                          ? 'published'
                          : 'appproved'
                        }`}
                    >
                      {nextArticleState === true
                        ? prevArticle.knowledgeState
                        : knowledgeState}
                    </span>
                  )}
                </div>
              </div>
              <div className=''>
                <Context.Consumer>
                  {(value) => (
                    <Button
                      variant='primary'
                      size='sm'
                      className='bor-5'
                      onClick={() => {
                        this.props.onHide();
                        value.openModal();
                      }}
                    >
                      Create Ticket
                    </Button>
                  )}
                </Context.Consumer>
              </div>
            </div>

            <div className='h-100 mt-3 mx-1 com-container'>
              <div className='com-container__box'>
                <div
                  className='w-100 d-block'
                  dangerouslySetInnerHTML={this.rawMarkup()}
                ></div>
              </div>
              <div className='com-container__buttons px-1 pt-3'>
                <div className='com-container__buttons__one'>
                  <span className='d-inline-block font-weight-bold mr-2'>
                    Was this article helpful?
                  </span>
                  <Button
                    size='sm'
                    className='bor-5 px-4 py-1 mr-2 bg-color'
                    onClick={this.submitVote}
                  >
                    Yes
                  </Button>
                  <Button
                    variant='danger'
                    size='sm'
                    className='bor-5 px-4 py-1'
                    onClick={this.modalOpenHandler}
                  >
                    No
                  </Button>
                </div>
                <div className='com-container__buttons__two'>
                  {/* <p className='next-btn'>Next:</p> */}

                  <div className='next-btn'>
                  {this.props.nextArticleTitle === 'no more articles'
                      ? null
                      : 'Next Article:'}
                    <span
                      className={classnames('', {
                        'comaround_next_link ml-1': this.props.nextArticleTitle !== 'no more articles',
                        'font-italic': this.props.nextArticleTitle === 'no more articles',
                      })}
                      onClick={
                        this.props.nextArticleTitle === 'no more articles'
                          ? null
                          : this.nextArt
                      }
                    >
                      {/* {nextArticleState === true
                        ? nextArticle.title */}
                      {nextArticleTitle.length > 50 ? nextArticleTitle.substr(0, 50) + '...' : nextArticleTitle}
                      {/* } */}
                    </span>
                  </div>

                  {/* <Link
                    to={{ pathname: 'home', state: { classification: true } }}
                  > */}
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <RequestModal
          show={this.state.requestModal}
          handleClose={() => this.setState({ requestModal: false })}
          submitformvalues={this.submitFormValues}
        />
        <SuccessModal
          show={this.state.successModal}
          onHide={() => {
            this.setState({ successModal: false })
            this.props.onHide();
            this.props.history.push('/home');
          }}
          bodyColor='bg-primary'
          title={this.state.modalTitle}
          iconhandler={() => {
            this.setState({ successModal: false });
            this.props.onHide();
            this.props.history.push('/home');
          }}
          falseIcon={this.state.submitError}
        />
      </>
    );
  }
}

export default withRouter(ComaroundModal);
