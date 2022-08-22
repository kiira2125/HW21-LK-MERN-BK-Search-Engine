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
    bookId: String
    authors: String
    description: String
    title: String
    image: String
    link: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: [User]
    user(username: String!): User
    # savedBooks(savedBooks: String): [Book] ??
    # book(bookId: ID!): Book ??
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(userId: ID!, bookId: String!): Book
    removeBook(userId: ID!, bookId: String!): Book
  }
`;

module.exports = typeDefs;
