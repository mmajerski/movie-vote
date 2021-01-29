const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    currentUser: User
    movies(categoryId: ID, offset: Int, limit: Int): [Movie!]!
    categories: [Category!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    signIn(username: String, email: String, password: String!): AuthPayload
    addVote(movieId: ID!): ID
    removeVote(movieId: ID!): ID
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    votes: [Vote!]!
  }

  type Category {
    id: ID!
    title: String
  }

  type Movie {
    id: ID!
    title: String!
    description: String!
    category: Category
    imageUrl: String!
    votes: [Vote!]!
  }

  type Vote {
    id: ID!
    movie: Movie
    user: User
  }
`;
