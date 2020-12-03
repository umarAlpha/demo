import React from 'react';
import './ClassificationCatelog.css';

import { Spinner } from 'react-bootstrap';

class SearchCatelogDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectCatalog = (item) => {
    this.props.getCatalogSearchItem(item);
  };

  render() {
    const {
      showSuggestions,
      spinnerStateCatalog,
      classificationCatalogData,
      globalDropdown,
    } = this.props;

    return (
      <>
        {globalDropdown ? (
          <div
            className={
              showSuggestions === true
                ? 'catalog-suggestion-container1 overflow-classification'
                : 'catalog-suggestion-container-hide overflow-classification'
            }
          >
            {spinnerStateCatalog === true ? (
              <div className='w-100 text-center'>
                <Spinner
                  animation='border'
                  size='sm'
                  style={{ color: '#0a3a60' }}
                />
              </div>
            ) : classificationCatalogData === undefined ||
              classificationCatalogData.length <= 0 ? (
              <div className='w-100 text-center text-primary'>
                <span>no results found against search value</span>
              </div>
            ) : (
              classificationCatalogData.map((search) => (
                <div
                  className='catalog-suggestion-inner-content'
                  onClick={() => this.selectCatalog(search)}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    <i>{search}</i>
                  </span>
                </div>
              ))
            )}
          </div>
        ) : (
          <div
            className={
              showSuggestions === true
                ? 'catalog-suggestion-container overflow-classification'
                : 'catalog-suggestion-container-hide overflow-classification'
            }
          >
            {spinnerStateCatalog === true ? (
              <div className='w-100 text-center'>
                <Spinner
                  animation='border'
                  size='sm'
                  style={{ color: '#0a3a60' }}
                />
              </div>
            ) : classificationCatalogData === undefined ||
              classificationCatalogData.length <= 0 ? (
              <div className='w-100 text-center text-primary'>
                <span>no results found against search value</span>
              </div>
            ) : (
              classificationCatalogData.map((search) => (
                <div
                  className='catalog-suggestion-inner-content'
                  onClick={() => this.selectCatalog(search)}
                >
                  <span>{search.publicId}</span>
                  <span style={{ fontWeight: 'bold' }}>
                    <i>{search.title}</i>
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </>
    );
  }
}

export default SearchCatelogDropdown;
