import { useEffect, useState } from "react";

const Pagination = ({ pages, setCurrentPage, currentCars, sortedCars }) => {
  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  const handleClick = (pageNumber) => {
    setCurrentButton(pageNumber);
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentButton - 5);
    let endPage = Math.min(startPage + 9, pages);

    const pageNumbers = [];

    if (startPage > 1) {
      // Render first page
      pageNumbers.push(
        <li
          key={1}
          className={`${
            currentButton === 1 ? "page-item active" : "page-item"
          }`}
        >
          <a href="#!" className="page-link" onClick={() => handleClick(1)}>
            1
          </a>
        </li>
      );
    }

    // Render previous pages
    if (startPage > 2) {
      pageNumbers.push(
        <li key={-1} className="page-item disabled">
          <span className="page-link ellipsis">...</span>
        </li>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${
            currentButton === i ? "page-item active" : "page-item"
          }`}
        >
          <a href="#!" className="page-link" onClick={() => handleClick(i)}>
            {i}
          </a>
        </li>
      );
    }

    // Render next pages
    if (endPage < pages - 1) {
      pageNumbers.push(
        <li key={-2} className="page-item disabled">
          <span className="page-link ellipsis">...</span>
        </li>
      );
    }

    if (endPage < pages) {
      // Render last page
      pageNumbers.push(
        <li
          key={pages}
          className={`${
            currentButton === pages ? "page-item active" : "page-item"
          }`}
        >
          <a href="#!" className="page-link" onClick={() => handleClick(pages)}>
            {pages}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="clearfix">
      <div className="hint-text">
        Showing <b>{currentCars.length}</b> out of <b>{sortedCars.length}</b>{" "}
        entries
      </div>
      <ul className="pagination">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <a href="#!" onClick={() => handleClick(currentButton - 1)}>
            Previous
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <a href="#!" onClick={() => handleClick(currentButton + 1)}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
