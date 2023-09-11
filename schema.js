import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    quotes: [Quote]
    iquote(by: ID!): [Quote]
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }

  type Token {
    token: String!
  }

  input SignUp {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input Login {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(signUp: SignUp!): User
    login(login: Login!): Token
  }
`;

export default typeDefs;
