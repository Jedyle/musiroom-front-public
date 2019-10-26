import React from 'react';

const Paginator = ({
    currentPage,
    previousPageUrl,
    nextPageUrl,
    onPreviousPage,
    onNextPage
}) => (
    <span>
      <a
        className="pagination-previous"
        disabled={!previousPageUrl}
        onClick={onPreviousPage}
      > {"<"} </a>
      <a
        className="pagination-next"
        disabled={!nextPageUrl}
        onClick={onNextPage}
      >{">"}</a>
    </span>
);

export default Paginator;
