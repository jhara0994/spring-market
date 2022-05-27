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
            else { 
                throw new AuthenticationError('No ID Provided!')
            }
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user }
        },
        addArt: async(parent, args) => {
            try {
                const newSale = await Art.create({ ...args })
                await User.findByIdAndUpdate(newSale, {$addToSet: {'catalog':newSale._id}})
                return newSale
            } catch (err) {
                console.log(err)
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne(( email ))

            if (!user) {
                throw new AuthenticationError('No user found with that email!')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password entered. Try again!')
            }

            const token = signToken(user)

            return { token, user }
        }
    }
}

module.exports = resolvers