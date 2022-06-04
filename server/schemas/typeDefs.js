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

    type Art {
        _id: ID
        title: String
        description: String
        image: String
        price: Int
        category: Category
    }

    type Checkout {
        session: ID
      }
    
    type Auth {
        token: ID
        user: User
    }
    
    type Query {
        categories: [Category]
        users(_id:ID): User
        artForSale(category: ID, title: String, id: ID): [Art]
        checkout(artForSale: [ID]!): Checkout
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
        addArt(title: String, description: String, image: String, price: Int, category: ID): Art
        updateArt(_id: ID!, title: String, description: String, image: String, price: Int, category: ID): Art
        login(email: String!, password: String!): Auth
        
    }
`

module.exports = typeDefs