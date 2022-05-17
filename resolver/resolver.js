const axios = require('axios').default;

const resolvers = {
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
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      return response.data;
    },
    getPeople: async () => {
      const response = await axios.get(`https://swapi.dev/api/people`);
      return response.data.results;
    },
    getNextPage: async (_, { url }) => {
      const response = await axios.get(`https://swapi.dev/api/people`);
      console.log(response.data);
      return response.data.results;
    },
  },
};

module.exports = resolvers;
