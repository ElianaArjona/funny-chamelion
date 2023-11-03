import React, { useState, useEffect } from 'react';
import { fetchRickAndMortyCharacters } from '../../service/apiService';


const DataGenerator = (props) => {
  const { selectedPageIndex, onItemsFetched, onMetadataFetched } = props;

  const fetchData = async (index) => {

    try {
      const response = await fetchRickAndMortyCharacters(index);
      const updatedItems = response.results.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        species: item.species,
        origin: item.origin.name,
      }));

      const updatedMetadata = {
        count: response.info.count,
        pages: response.info.pages,
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
    fetchData(selectedPageIndex);
  }, [selectedPageIndex]);

  return null;
};

export default DataGenerator;
