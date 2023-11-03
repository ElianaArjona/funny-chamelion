import axios from 'axios';

const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

// Function to fetch characters from the Rick and Morty API
export async function fetchRickAndMortyCharacters(page) {
  page += 1;
  try {
    const response = await rickAndMortyApi.get(`/character/?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllMetadata() {
  try {
    const response = await rickAndMortyApi.get(`/character/?page=0`);

    return response.data.info;

  } catch (error) {
    throw error;
  }
}

// Function to fetch filtered text in All characters from the Rick and Morty API
export async function fetchAllCharacters() {
  let page = 1;
  let items = [];

  try {
    while (true) {
      const response = await rickAndMortyApi.get(`/character/?page=${page}`);
      const fixItems = response.data.results.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        species: item.species,
        origin: item.origin.name,
      }));

      
      items = items.concat(fixItems);

      // Check if there are more pages to fetch
      if (response.data.info.next) {
        page++;
      } else {
        break; // No more pages to fetch, so exit the loop.
      }
    }

    return items;

  } catch (error) {
    throw error;
  }
}

// Function to fetch filtered text in All characters from the Rick and Morty API
export async function filterAllCharacters(text) {
  let page = 1;
  let items = [];

  try {
    while (true) {
      const response = await rickAndMortyApi.get(`/character/?page=${page}`);
      const fixItems = response.data.results.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        species: item.species,
        origin: item.origin.name,
      }));

      // Filter items based on the input text
      const filteredItems = fixItems.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      );

      // Concatenate the filtered items to the 'items' array
      items = items.concat(filteredItems);

      // Check if there are more pages to fetch
      if (response.data.info.next) {
        page++;
      } else {
        break; // No more pages to fetch, so exit the loop.
      }
    }

    return items;

  } catch (error) {
    throw error;
  }
}



