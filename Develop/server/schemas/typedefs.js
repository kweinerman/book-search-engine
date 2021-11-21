const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: [Author]
    title: String
    link: String
    description: String
    image: String
    bookId: ID
  }

  type Author {
    _id: ID
    name: String
  }


  type Auth {
    token: ID!
    user: User
  }

  input bookInput {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    getSingleUser: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookDatas: bookInput): User
    removeBook(bookId: ID!): User

  }
`;

module.exports = typeDefs;