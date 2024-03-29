import React from "react";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import "./mypagination.scss";

MyPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

const generatePages = props => {
  let pagination = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pagination.push(
      <Pagination.Item
        key={i}
        className="itemsStyle"
        
        onClick={() => props.handleChangePage(i)}
        active={i === props.activePage ? true : false}
      >
        {i}
      </Pagination.Item>
    );
  }
  return pagination;
};

function MyPagination(props) {
  return (
    <Pagination size="md" className="p-0 m-0">
      {generatePages(props)}
    </Pagination>
  );
}

export default MyPagination;
