import React, { Component } from 'react';
import './HeaderSearch.css';

import Heading from '../../components/Heading/Heading';
import CustomInput from '../../components/CustomInput/CustomInput';
import SearchButton from '../../components/SearchButton/SearchButton';
import ClassficationCatelog from '../../components/ClassificationCatelog/ClassificationCatelog';
import SelectionModal from '../../components/SelectionModal/SelectionModal';

import Context from '../../ContextApi/CountsContext/context';
import CreateTicketModal from '../../screens/CreateTicketScreen/CreateTicketModal/CreateTicketModal';

class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionModal: false,
      createTicketModal: false,
    };
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  // getSuggestions = (value) => {
  //   ComController.getGlobalSuggestions(value, (res) => {
  //     this.setState({
  //       suggestions: res.data.suggestions,
  //       spinnerSuggestion: false,
  //     });
  //   });
  // };

  // inputChangeHandler = (e) => {
  //   let value = e.target.value;
  //   if (/\S/.test(value)) {
  //     // string is not empty and not just whitespace
  //     this.setState({ showSuggestions: true });
  //     this.getSuggestions(value);
  //   } else {
  //     this.setState({ showSuggestions: false, globalSearch: '' });
  //   }
  // };

  navigationHandler = () => {
    this.setState({ selectionModal: true });
  };

  selectHandler = (value) => {
    this.setState({ globalSearchFilter: value });
  };

  // searchPressHandler = (e) => {
  //   if (e.key === 'Enter') {
  //     if (
  //       this.state.globalSearch !== '' ||
  //       this.state.globalSearchFilter !== ''
  //     ) {
  //       if (this.state.globalSearchFilter === 'Helpful Article') {
  //         this.props.history.push({
  //           pathname: '/search',
  //           state: {
  //             text: this.state.globalSearch,
  //             // globalSearchFilter: this.state.globalSearchFilter,
  //           },
  //         });
  //         this.setState({ showSuggestions: false });
  //       }
  //       // if (this.state.globalSearchFilter === 'All Tickets') {
  //       //   this.props.history.replace({
  //       //     pathname: '/myticket',
  //       //     state: {
  //       //       globalSearch: this.state.globalSearch,
  //       //       globalSearchFilter: this.state.globalSearchFilter,
  //       //     },
  //       //   });
  //       // }
  //       // if (this.state.globalSearchFilter === 'WorkOrders') {
  //       //   this.props.history.replace({
  //       //     pathname: '/workorders',
  //       //     state: {
  //       //       globalSearch: this.state.globalSearch,
  //       //       globalSearchFilter: this.state.globalSearchFilter,
  //       //     },
  //       //   });
  //       // }
  //     } else {
  //       return;
  //     }
  //   }
  // };

  selectionHandler = (value) => {
    if (value !== '' || this.state.globalSearchFilter !== '') {
      if (this.state.globalSearchFilter === 'Helpful Article') {
        this.props.history.push({
          pathname: '/search',
          state: {
            text: value,
            // globalSearchFilter: this.state.globalSearchFilter,
          },
        });
        this.setState({ globalSearch: value, showSuggestions: false });
      }
      // if (this.state.globalSearchFilter === 'All Tickets') {
      //   this.props.history.replace({
      //     pathname: '/myticket',
      //     state: {
      //       globalSearch: value,
      //       globalSearchFilter: this.state.globalSearchFilter,
      //     },
      //   });
      //   this.setState({ globalSearch: '', showSuggestions: false });
      // }
      // if (this.state.globalSearchFilter === 'WorkOrders') {
      //   this.props.history.replace({
      //     pathname: '/workorders',
      //     state: {
      //       globalSearch: this.state.globalSearch,
      //       globalSearchFilter: this.state.globalSearchFilter,
      //     },
      //   });
      // }
    } else {
      return;
    }
  };

  // closeDropdown = () => {
  //   this.setState({
  //     globalSearch: '',
  //     suggestions: [],
  //     showSuggestions: false,
  //     spinnerSuggestion: true,
  //   });
  // };

  render() {
    const { suggestions, showSuggestions, spinnerSuggestion } = this.props;
    const { selectionModal, createTicketModal } = this.state;
    return (
      <>
        <div className='headerSearch'>
          <div className='headerSearch__item1'>
            <div className='w-100'>
              <Heading textOne='Welcome to' textTwo='Self-Service Portal' />
              <div className='w-100 position-relative'>
                <CustomInput
                  placeholder='How may we help you'
                  name='search'
                  value={this.props.globalSearch}
                  onChange={this.props.inputChangeHandler}
                  onKeyPressCapture={(e) => this.props.searchPressHandler(e)}
                  searchIconHandler={(e) =>
                    this.props.searchPressHandler({ key: 'Enter' })
                  }
                  dropdown
                  globalFilterValue={this.props.selectHandler}
                  defaultvalue={this.props.globalSearchFilter}
                  className='br'
                  show={showSuggestions === true}
                  closeCatalogDropdown={this.props.closeDropdown}
                />
                <ClassficationCatelog
                  showSuggestions={showSuggestions}
                  classificationCatalogData={suggestions}
                  globalDropdown
                  spinnerStateCatalog={spinnerSuggestion}
                  getCatalogSearchItem={this.props.selectionHandler}
                />
              </div>
              <SearchButton onClick={this.navigationHandler}>
                Submit Request
              </SearchButton>
            </div>
          </div>
          <div className='headerSearch__picture d-none d-xs-none d-md-block'>
            <img
              src={require('../../assets/images/header-img.png')}
              alt='header'
              className='img-fluid  d-sm-none d-xs-none d-md-block'
              style={{ height: 'inherit' }}
            />
          </div>
        </div>
        <SelectionModal
          show={selectionModal}
          onHide={() => this.setState({ selectionModal: false })}
          history={this.props.history}
          openModal={() => this.setState({ createTicketModal: true })}
        />
        <Context.Consumer>
          {(value) => (
            <CreateTicketModal
              show={value.ticketModal ? value.ticketModal : createTicketModal}
              onHide={() => {
                if (value.ticketModal) {
                  return value.closeModal();
                }
                this.setState({ createTicketModal: false });
              }}
            />
          )}
        </Context.Consumer>
      </>
    );
  }
}

export default HeaderSearch;
