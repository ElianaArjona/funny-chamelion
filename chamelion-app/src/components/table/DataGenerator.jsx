import React, { useState, useEffect } from 'react';
import { fetchAllMetadata, fetchAllCharacters } from '../../service/apiService';


const DataGenerator = (props) => {
  const { selectedPageIndex, onItemsFetched, onMetadataFetched, selectedItemsPerPage } = props;

  const fetchData = async (index, itemsPerPage) => {

    console.log(selectedPageIndex)

    try {
      let updatedItems = await fetchAllCharacters();

      // Calculate the start and end indices for slicing
      const startIndex = (index) * parseInt(itemsPerPage);
      let endIndex = startIndex + parseInt(itemsPerPage);

      const totalItems = updatedItems.length;
      if (endIndex > totalItems) {
        endIndex = totalItems;
      }

      updatedItems = updatedItems.slice(startIndex, endIndex);

      console.log(startIndex)
      console.log(endIndex)


      const response = await fetchAllMetadata(index);
      const updatedMetadata = {
        count: response.count,
        pages: Math.ceil(response.count / itemsPerPage)
      }

      console.log(updatedMetadata)
      console.log('API Response:', response);

      onItemsFetched(updatedItems);
      onMetadataFetched(updatedMetadata);


    } catch (error) {
      console.error('Error fetching Rick and Morty data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedPageIndex, selectedItemsPerPage);
  }, [selectedPageIndex, selectedItemsPerPage]);

  return null;
};

export default DataGenerator;
