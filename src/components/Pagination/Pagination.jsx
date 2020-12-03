import React from 'react';
import './Pagination.css';

import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
  return (
    <ReactPaginate
      nextClassName={'page-link page-button'}
      previousClassName={'page-link page-button'}
      previousLabel={'<<'}
      nextLabel={'>>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link pagination-link'}
      initialPage={props.initialpage}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.handlePageClick}
      containerClassName={'pagination  pagination-border-radius'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={props.forcepage}
    />
  );
};

export default Pagination;
