import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <div>
      <ul className="pagination-container align-center">
        <li
          className={"pagination-item " + (currentPage === 1 ? "disabled" : "")}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange &&
          paginationRange.map((pageNumber: any) => {
            if (pageNumber === DOTS) {
              return (
                <li className="pagination-item dots" key={pageNumber}>
                  &#8230;
                </li>
              );
            }

            return (
              <li
                className={
                  "pagination-item " +
                  (pageNumber === currentPage ? "selected" : "")
                }
                onClick={() => onPageChange(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </li>
            );
          })}
        <li
          className={
            "pagination-item" + (currentPage === lastPage ? "disabled" : "")
          }
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
