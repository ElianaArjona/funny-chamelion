import React, { useState } from 'react';
import  PaginationControl  from './PaginationControl';
import  ItemList  from './ItemList';
import  DataGenerator  from './DataGenerator';

const TableList = () => {
  const [isFilterActive, setFilterActive] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(10);

  const [items, setItems] = useState([]);
  const [metadata, setMetadata] = useState({});

  const handleSelectedOption = (ev, option) => {
    console.log(option.key)
    setSelectedOption(option.key);
  };

  const handlePageChange = (index) => {
    console.log(index)
    setSelectedPageIndex(index);
  };

  const handleItemsFetched = (fetchedItems) => {
    setItems(fetchedItems);
  };

  const handleMetdataFetched = (fetchedMetdata) => {
    setMetadata(fetchedMetdata);
  };

  const handleFilterActive = (status) => {
    console.log(status)
    setFilterActive(!status);
  };


  return (
    <>
    <DataGenerator
        selectedPageIndex={selectedPageIndex}
        selectedItemsPerPage={selectedOption}
        onItemsFetched={handleItemsFetched}
        onMetadataFetched={handleMetdataFetched}/>
      <ItemList 
            items={items} 
            onFilterStatus={handleFilterActive} 
            selectedOption={handleSelectedOption}
        />
      {!isFilterActive ? (
        <PaginationControl
            selectedPageIndex={selectedPageIndex}
            onPageChange={handlePageChange}
            fetchItems={items}
            fetchMetadata={metadata}
            // onItemsFetched={handleItemsFetched}
            // onFilterStatus={handleItemsFetched}
        />
        ) : null}
     
    </>
  );
};

export default TableList;
