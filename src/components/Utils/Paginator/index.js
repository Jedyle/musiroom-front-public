import React from 'react';

const Paginator = ({
    previousPageUrl,
    nextPageUrl,
    onPreviousPage,
    onNextPage
}) => (
    <span>
      <a
        className="pagination-previous"
        disabled={!previousPageUrl}
        onClick={previousPageUrl && onPreviousPage}
      > {"<"} </a>
      <a
        className="pagination-next"
        disabled={!nextPageUrl}
        onClick={nextPageUrl && onNextPage}
      >{">"}</a>
    </span>
);

export default Paginator;
