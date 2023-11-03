import React, { useState, useEffect } from 'react';
import { Pagination } from '@fluentui/react-experiments/lib/Pagination';

const PaginationControl = (props) => {
  const { selectedPageIndex, onPageChange, fetchItems, fetchMetadata } = props;

  return (
    <Pagination
      selectedPageIndex={selectedPageIndex}
      pageCount={fetchMetadata.pages}
      itemsPerPage={fetchItems.length}
      totalItemCount={fetchMetadata.count}
      format={'buttons'}
      previousPageAriaLabel={'previous page'}
      nextPageAriaLabel={'next page'}
      firstPageAriaLabel={'first page'}
      lastPageAriaLabel={'last page'}
      pageAriaLabel={'page'}
      selectedAriaLabel={'selected'}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationControl;
