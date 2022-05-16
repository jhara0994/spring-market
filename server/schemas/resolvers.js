const { AuthenticationError } = require('apollo-server-express');
const { async } = require('rxjs');
const { User, Category, Art, Order } = require('../models')
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find()
        },
        products: async (parent, { category, title, id }) => {
            const params = {}
            
        }
    }

}