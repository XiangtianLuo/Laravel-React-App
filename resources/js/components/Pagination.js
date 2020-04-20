import React from "react";
import Pagination from "react-js-pagination";

const PaginationPage =(props)=>(
    <div>
    <Pagination
      activePage={props.activePage}
      itemsCountPerPage={8}
      totalItemsCount={props.totalItemsCount} //props.tasks.length
      pageRangeDisplayed={5}
      onChange={props.handlePageChange}
      itemClass="page-item"
      linkClass="page-link"
    />
  </div>
)
export default PaginationPage;