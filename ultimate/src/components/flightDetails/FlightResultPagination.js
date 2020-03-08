import React from "react";
import { Pagination } from "react-bootstrap";

const FlightResultPagination = props => {
  let {
    currentPage,
    flightsPerPage,
    flightData,
    changePage,
    showPrevPage,
    showNextPage
  } = props;

  /* Format the array to be passed to the pagination to show only prev, first, last, next, 
    current page and　a number before and after the current page */

  let pageNumbers = [];
  let numberOfPages = Math.ceil(flightData[0].length / flightsPerPage);

  if (currentPage > 1)
    pageNumbers.push(<Pagination.Prev key="a" onClick={showPrevPage} />);

  for (let i = 1; i <= numberOfPages; i++) {
    if (i === 1) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => changePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  if (currentPage >= 4) pageNumbers.push(<Pagination.Ellipsis key="b" />);

  for (let i = 1; i <= numberOfPages; i++) {
    if (
      i >= currentPage - 1 &&
      i <= currentPage + 1 &&
      i > 1 &&
      i < numberOfPages
    ) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => changePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  if (currentPage <= numberOfPages - 3)
    pageNumbers.push(<Pagination.Ellipsis key="c" />);

  for (let i = 1; i <= numberOfPages; i++) {
    if (i === numberOfPages) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => changePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  if (currentPage < numberOfPages)
    pageNumbers.push(<Pagination.Next key="d" onClick={showNextPage} />);

  console.log(pageNumbers);

  return <Pagination>{pageNumbers}</Pagination>;
};

export default FlightResultPagination;
