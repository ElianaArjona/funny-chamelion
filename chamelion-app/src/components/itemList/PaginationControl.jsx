import React from 'react';
import { Pagination } from '@fluentui/react-experiments/lib/Pagination';

const PaginationControl = (props) => {
  const { selectedPageIndex, onPageChange, fetchItems, fetchMetadata } = props;
  const leftItemIndex = fetchItems.length > 0 ? fetchItems[0].id : 0;
  const rightItemsIndex = fetchItems.length > 0 ? fetchItems[fetchItems.length - 1].id : 0;


  return (
    <Pagination
      selectedPageIndex={selectedPageIndex}
      pageCount={fetchMetadata.pages}
      itemsPerPage={fetchItems.length}
      totalItemCount={fetchMetadata.count}
      format="buttons"
      previousPageAriaLabel="previous page"
      nextPageAriaLabel="next page"
      firstPageAriaLabel="first page"
      lastPageAriaLabel="last page"
      pageAriaLabel="page"
      selectedAriaLabel="selected"
      onPageChange={onPageChange}
      // Override the onRenderVisibleItemLabel to display the correct item range
      onRenderVisibleItemLabel={(paginationProps) => {
        return (
          <div>
            {leftItemIndex} - {rightItemsIndex} of {paginationProps.totalItemCount}
          </div>
        );}}
    />
  );
};

export default PaginationControl;



