import React from 'react';
import './CustomAccordion.css';

import classnames from 'classnames';

import { Accordion } from 'react-bootstrap';

import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';

class CustomAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrow: false,
    };
  }

  toggle = () => {
    this.setState((preState) => {
      return {
        arrow: !preState.arrow,
      };
    });
    // if (this.state.activeAccordian === id) {
    //   this.setState({ activeAccordian: 0 });
    // } else {
    //   this.setState({ activeAccordian: id });
    // }
  };

  render() {
    // console.log('Description', this.props.description);
    return (
      <>
        {this.props.selection ? (
          <Accordion>
            <div className={classnames('csaccordion', this.props.className)}>
              <Accordion.Toggle
                as='span'
                variant='link'
                eventKey={this.props.id}
                onClick={() => this.toggle()}
              >
                <div
                  className={classnames(
                    'd-flex align-items-center justify-content-between',
                    {
                      'bg-secondary bor-5': this.props.active === true,
                    }
                  )}
                >
                  <div
                    className={classnames(
                      'csaccordion__item py-2 px-1 font-weight-bold',
                      this.props.titleStyle,
                      {
                        'font-weight-bold': this.props.font_weight_bold,
                        'text-white': this.props.active === true,
                      }
                    )}
                    onClick={this.props.modalOpenHandler}
                  >
                    {this.props.title}
                  </div>
                  <div>
                    {this.state.arrow ? (
                      <AiOutlineDown size={18} color='#ccc' />
                    ) : (
                      <Accordion.Toggle
                        as='span'
                        variant='link'
                        eventKey={this.props.id}
                        // onClick={() => this.toggle()}
                      >
                        <AiOutlineRight
                          size={18}
                          color='#ccc'
                          // onClick={this.props.modalOpenHandler}
                        />
                      </Accordion.Toggle>
                    )}
                  </div>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse variant='link' eventKey={this.props.id}>
                <div onClick={this.props.modalOpenHandler}>
                  <p
                    className={classnames(
                      'csaccordion__paragraph',
                      this.props.paragraphStyle
                    )}
                  >
                    {this.props.description}
                  </p>
                </div>
              </Accordion.Collapse>
            </div>
          </Accordion>
        ) : (
          <Accordion>
            <div className={classnames('csaccordion', this.props.className)}>
              <div className='d-flex align-items-center justify-content-between'>
                <div
                  className={classnames(
                    'csaccordion__item py-2 font-weight-bold',
                    this.props.titleStyle,
                    {
                      'font-weight-bold': this.props.font_weight_bold,
                      'bg-secondary text-light bor-5':
                        this.props.active === true,
                    }
                  )}
                  onClick={this.props.modalOpenHandler}
                >
                  {this.props.title}
                </div>
                <div>
                  {this.state.arrow ? (
                    <Accordion.Toggle
                      as='span'
                      variant='link'
                      eventKey={this.props.id}
                      onClick={() => this.toggle()}
                    >
                      <AiOutlineDown size={18} color='#ccc' />
                    </Accordion.Toggle>
                  ) : (
                    <Accordion.Toggle
                      as='span'
                      variant='link'
                      eventKey={this.props.id}
                      onClick={() => this.toggle()}
                    >
                      <AiOutlineRight
                        size={18}
                        color='#ccc'
                        // onClick={this.props.modalOpenHandler}
                      />
                    </Accordion.Toggle>
                  )}
                </div>
              </div>
              <Accordion.Collapse variant='link' eventKey={this.props.id}>
                <div onClick={this.props.modalOpenHandler}>
                  <p
                    className={classnames(
                      'csaccordion__paragraph',
                      this.props.paragraphStyle
                    )}
                  >
                    {this.props.description}
                  </p>
                </div>
              </Accordion.Collapse>
            </div>
          </Accordion>
        )}
      </>
    );
  }
}

export default CustomAccordion;
