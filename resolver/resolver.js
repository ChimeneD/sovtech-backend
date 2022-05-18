const axios = require('axios').default;

const resolvers = {
  AllPeople: {
    results: (parent) => {
      const promises = parent.results.map(async (person) => {
        const response = await axios.get(person.url);
        return response.data;
      });
      return Promise.all(promises);
    },
  },
  Person: {
    films: (parent) => {
      const promises = parent.films.map(async (url) => {
        const response = await axios.get(url);
        return response.data;
      });
      return Promise.all(promises);
    },
  },
  Query: {
    getPerson: async (_, { id }) => {
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
    getNextPrevPage: async (_, { url }) => {
      const response = await axios.get(url);
      return response.data;
    },
    searchPerson: async (_, { name }) => {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${name}`,
      );
      //get people
      const peopleArray = await response.data.results;
      return peopleArray;
    },
  },
};

module.exports = resolvers;
