const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Art, Order } = require('../models')
const { signToken } = require('../utils/auth')
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find()
        },
        artForSale: async (parent, { category, title, id }) => {
            const params = {}

            if (category) {
                params.category = category
            }
            
            if (title) {
                params.title = {
                    $regex: title
                }
            }

            if (id) {
                params._id = id
            }

            return await Art.find(params).populate('category')
        },
        users: async (parent, { _id }) => {
            if(_id) {
                await User.findById(_id)
            }
        }
    }
}

module.exports = resolvers