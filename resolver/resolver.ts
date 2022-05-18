import axios from 'axios';

export const resolvers = {
  AllPeople: {
    results: (parent: any) => {
      const promises = parent.results.map(async (person: any) => {
        const response = await axios.get(person.url);
        return response.data;
      });
      return Promise.all(promises);
    },
  },
  Person: {
    films: (parent: any) => {
      const promises = parent.films.map(async (url: any) => {
        const response = await axios.get(url);
        return response.data;
      });
      return Promise.all(promises);
    },
  },
  Query: {
    getPerson: async (_: any, { id }: any) => {
      const response = await axios.get(`${id}`);
      return response.data;
    },
    getAllPeople: async () => {
      const response = await axios.get(`https://swapi.dev/api/people`);
      return response.data;
    },
    getPeople: async () => {
      const response = await axios.get(`https://swapi.dev/api/people`);
      return response.data.results;
    },
    getNextPrevPage: async (_: any, { url }: any) => {
      const response = await axios.get(url);
      return response.data;
    },
    searchPerson: async (_: any, { name }: any) => {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${name}`,
      );
      //get people
      const peopleArray = await response.data.results;
      return peopleArray;
    },
  },
};
