import React, { Component } from 'react';
// import './CreateTicketModal.css';
import {Images} from '../../assets/Assets';
import { RiCloseLine } from 'react-icons/ri';

import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button, Card } from 'react-bootstrap';

import {QuickLinks} from '../../assets/Data';

class CreateTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getServices();
  }

  // componentDidUpdate(preProps, preState) {
  //   if (preProps.show !== this.props.show) {
  //     this.setState({
  //       services: [...this.state.services2],
  //       page: 1,
  //       selectService: '',
  //       selectCategory: '',
  //       selectSubCategory: '',
  //       categories: [],
  //       subCategories: [],
  //       classificationCatalogData: [],
  //       catalogSearchText: '',
  //       btn: false,
  //     });
  //   }
  // }

  componentWillUnmount() {}

  setServiceSelectionHandler = (item) => {
    // console.log(item);
    this.props.onHide();
    window.open(item.url, '_blank');
    // this.props.history.replace({pathname: 'createticket', state: {service: item.service, category: item.category, subcat: item.subcategory, url: item.url}});
  }

  navigationHandler = () => {
    this.props.onHide();
    this.props.openModal();
    // this.props.history.push('/createticket');
  }

  render() {
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
          <div style={{ position: 'absolute', right: '1%', cursor: 'pointer' }} onClick={() => {
            this.props.onHide()
            }}>
            <RiCloseLine size={20} />
          </div>
          <img src={Images.logo} alt='modal-pic' className='w-25' />
        </Modal.Header>
        <Modal.Body>
          <Row>
            {QuickLinks.map((item) => (
                <Col>
                <Card className='text-center p-3' style={{cursor: "pointer"}} onClick={() => this.setServiceSelectionHandler(item)}>
                  <div className='text-center'>
                    <img src={item.src} alt={`modal-${item.id}`} className='w-25' />
                  </div>
                  {item.name}
                </Card>
                
              </Col>
            ))}
            
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-right'>
            <Button variant='outline-primary' size='sm' onClick={this.navigationHandler}>Select Classification</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateTicketModal;
