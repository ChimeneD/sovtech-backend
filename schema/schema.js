const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Film {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    homeworld: String
    url: String
    films: [Film]
  }

  type AllPeople {
    count: String
    next: String
    previous: String
    results: [Person]
  }

  type Query {
    getPerson(id: ID!): Person
    getAllPeople: AllPeople
    getPeople: [Person]
    getNextPrevPage(url: String!): AllPeople
    searchPerson(name: String!): [Person]
  }
`;
/* 

*/

module.exports = typeDefs;
