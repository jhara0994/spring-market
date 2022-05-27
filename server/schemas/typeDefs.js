const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        orders: [ID]
    }

    type Category {
        _id: ID
        name: String
    }

    type Checkout {
        session: ID
      }
    
    type Auth {
        token: ID
        user: User
    }
    
    type Art {
        _id: ID
        title: String
        description: String
        image: String
        price: Int
        category: Category
    }

    type Query {
        categories: [Category]
        users(_id:ID): User
        artForSale(category: ID, title: String, id: ID): [Art]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password!): Auth
        addArt(title: String, description: String, image: String, price: Int, category: ID): Art
        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs