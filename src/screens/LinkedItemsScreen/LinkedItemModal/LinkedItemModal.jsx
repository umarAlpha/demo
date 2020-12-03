import React, { Component } from 'react';
import './LinkedItemModal.css';

import classnames from 'classnames';
import Context from '../../../ContextApi/CountsContext/context';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import LinkedItemDetail from '../../../components/LinkedItemDetail/LinkedItemDetail';

import linkedController from '../LinkedItemsController';
import { getValueForFieldId } from '../../../Utility/CommonMethods';

import Computer from '../../../BussinessObjects/CI/Computer';
import Electrical from '../../../BussinessObjects/CI/Electrical';
import Hvac from '../../../BussinessObjects/CI/HVAC';
import MobileDevice from '../../../BussinessObjects/CI/MobileDevice';
import NetworkDevice from '../../../BussinessObjects/CI/NetworkDevice';
import OtherCI from '../../../BussinessObjects/CI/OtherCI';
import Printer from '../../../BussinessObjects/CI/Printer';
import Server from '../../../BussinessObjects/CI/Server';
import Software from '../../../BussinessObjects/CI/Software';
import System from '../../../BussinessObjects/CI/System';
import Telephony from '../../../BussinessObjects/CI/Telephony';

class LinkedItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      tabValue: 0,
      fields: [],
      nextItemClick: false,
    };
  }

  componentDidMount() {
    this.getLinkedItemDetails();
  }

  componentDidUpdate(preProps, preState, snapShot) {
    if (preProps.show !== this.props.show) {
      this.setState({ nextItemClick: false });
    }
  }

  getLinkedItemDetails = () => {
    const { nextLinkedItem } = this.props;
    let busObId = !this.state.nextItemClick
      ? this.props.busobid
      : nextLinkedItem.busObId;
    let busObRecId = !this.state.nextItemClick
      ? this.props.busobrecid
      : nextLinkedItem.busObRecId;

    linkedController.getLinkedItemsDetails(
      busObId,
      busObRecId,

      (response) => {
        if (!response.success) {
          console.log('response', response);
          // localStorage.clear();
          // this.props.history.push('/login');
        } else {
          if (response.data.fields) {
            this.setState({ fields: response.data.fields });
          }
        }
      }
    );
  };

  renderComputerDetails = () => {
    return (
      <>
        {Computer.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderComputerDetails2 = () => {
    return (
      <>
        {Computer.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderMobileDetails = () => {
    return (
      <>
        {MobileDevice.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderMobileDetails2 = () => {
    return (
      <>
        {MobileDevice.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderSystemDetails = () => {
    return (
      <>
        {System.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderSystemDetails2 = () => {
    return (
      <>
        {System.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderELectricalDetails = () => {
    return (
      <>
        {Electrical.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderELectricalDetails2 = () => {
    return (
      <>
        {Electrical.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderHVACDetails = () => {
    return (
      <>
        {Hvac.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderHVACDetails2 = () => {
    return (
      <>
        {Hvac.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderNetworkDetails = () => {
    return (
      <>
        {NetworkDevice.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderNetworkDetails2 = () => {
    return (
      <>
        {NetworkDevice.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderOtherCIkDetails = () => {
    return (
      <>
        {OtherCI.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderOtherCIkDetails2 = () => {
    return (
      <>
        {OtherCI.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderPrinterDetails = () => {
    return (
      <>
        {Printer.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderPrinterDetails2 = () => {
    return (
      <>
        {Printer.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderServerDetails = () => {
    return (
      <>
        {Server.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderServerDetails2 = () => {
    return (
      <>
        {Server.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderSoftwareDetails = () => {
    return (
      <>
        {Software.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderSoftwareDetails2 = () => {
    return (
      <>
        {Software.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderTelephoneDetails = () => {
    return (
      <>
        {Telephony.manualFields.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  renderTelephoneDetails2 = () => {
    return (
      <>
        {Telephony.manualFields2.map((item) => (
          <LinkedItemDetail
            label={item.displayName}
            value={
              this.state.fields &&
              getValueForFieldId(
                item.businessObjectID,
                '- no record on field -',
                this.state.fields
              )
            }
          />
        ))}
      </>
    );
  };

  nextLinkedItem = () => {
    const { nextLinkedItem } = this.props;
    console.log('nexticccc', nextLinkedItem.assetTag);
    if (nextLinkedItem !== undefined || nextLinkedItem !== {}) {
      this.setState({ nextItemClick: true, fields: [] });
      this.props.nextLinkedItemStateHandler();
      this.props.getNextLinkedItem(nextLinkedItem.assetTag, true);
      this.getLinkedItemDetails();
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size='xl'
        aria-labelledby='contained-modal-linkedItem-vcenter'
        centered
        scrollable={false}
      >
        <Modal.Header className='linkedmodal-header' closeButton>
          
          <Modal.Title className='linkedmodal-title'>
            { !this.state.nextItemClick ? this.props.type : this.props.nextLinkedItem.type }
          </Modal.Title>

          <div className='link-model-create-ticket-btn'>
            <Context.Consumer>
              {(value) => (
                <Button
                  variant='primary'
                  size='sm'
                  className='bor-5'
                  onClick={() => {
                    this.props.onHide();
                    //value.openModal({ service: this.props.service, category: this.props.category });
                    value.openModal()
                  }}
                >
                  Create Ticket
                </Button>
              )}
            </Context.Consumer>
          </div>

        </Modal.Header>
        <Modal.Body className='linkedmodal-body'>
          <Row>
            <Col sm={6} md={6} lg={6} xl={6}>
              {this.props.type === 'Config - Computer'
                ? this.renderComputerDetails()
                : this.props.type === 'Config - Mobile Device'
                ? this.renderMobileDetails()
                : this.props.type === 'Config - System'
                ? this.renderSystemDetails()
                : this.props.type === 'Config - Electrical'
                ? this.renderELectricalDetails()
                : this.props.type === 'Config - HVAC'
                ? this.renderHVACDetails()
                : this.props.type === 'Config - Network Device'
                ? this.renderNetworkDetails()
                : this.props.type === 'Config - Other CI'
                ? this.renderOtherCIkDetails()
                : this.props.type === 'Config - Printer'
                ? this.renderPrinterDetails()
                : this.props.type === 'Config - Server'
                ? this.renderServerDetails()
                : this.props.type === 'Config - Software License'
                ? this.renderSoftwareDetails()
                : this.props.type === 'Config - Telephony Equipment'
                ? this.renderTelephoneDetails()
                : null}
            </Col>
            <Col sm={6} md={6} lg={6} xl={6}>
              {this.props.type === 'Config - Computer'
                ? this.renderComputerDetails2()
                : this.props.type === 'Config - Mobile Device'
                ? this.renderMobileDetails2()
                : this.props.type === 'Config - System'
                ? this.renderSystemDetails2()
                : this.props.type === 'Config - Electrical'
                ? this.renderELectricalDetails2()
                : this.props.type === 'Config - HVAC'
                ? this.renderHVACDetails2()
                : this.props.type === 'Config - Network Device'
                ? this.renderNetworkDetails2()
                : this.props.type === 'Config - Other CI'
                ? this.renderOtherCIkDetails2()
                : this.props.type === 'Config - Printer'
                ? this.renderPrinterDetails2()
                : this.props.type === 'Config - Server'
                ? this.renderServerDetails2()
                : this.props.type === 'Config - Software License'
                ? this.renderSoftwareDetails2()
                : this.props.type === 'Config - Telephony Equipment'
                ? this.renderTelephoneDetails2()
                : null}
            </Col>
          </Row>

          <div className='d-flex align-items-center justify-content-end pt-1 pb-2'>
            <div className='know-container__buttons__two'>
              <div className='next-btn'>
                {this.props.nextLinkedItemTitle === 'no more CI items'
                  ? null
                  : 'Next Linked Item: '}
                <span
                  className={classnames('ml-1', {
                    'next-article__link':
                      this.props.nextLinkedItemTitle !== 'no more CI items',
                    'font-italic':
                      this.props.nextLinkedItemTitle === 'no more CI items',
                  })}
                  onClick={
                    this.props.nextLinkedItemTitle === 'no more CI items'
                      ? null
                      : this.nextLinkedItem
                  }
                >
                  {this.props.nextLinkedItemTitle &&
                  this.props.nextLinkedItemTitle.length > 50
                    ? this.props.nextLinkedItemTitle.substr(0, 50) + '...'
                    : this.props.nextLinkedItemTitle
                    ? this.props.nextLinkedItemTitle
                    : 'no details found'}
                </span>
              </div>
            </div>
          </div>

        </Modal.Body>
      </Modal>
    );
  }
}

export default LinkedItemModal;
