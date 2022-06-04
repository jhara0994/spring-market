const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Art, Order } = require('../models')
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        users: async (parent, {_id}) => {
            if(_id) {
                const user = await User.findById(_id)
                return user
            }
            else { 
                throw new AuthenticationError('No ID Provided!')
            }
        },
        checkout: async(parent, args, context) => {
            const url = new URL(context.headers.referer).origin
            console.log(url)

            const order = await Order.create({ artForSale: args.arts })
            console.log(order)

            const userUpdate = await User.findByIdAndUpdate(args, {$addToSet: {orders: order._id}}, {new: true})
            console.log(userUpdate)

            const line_items = []
            const { arts } = await order.populate('arts')
            console.log(arts)

            for(let i = 0; i < arts.length; i++) {
                try {
                    const art = await stripe.arts.create({
                        title: arts[i].title,
                        description: arts[i].description,
                    })

                    const price = await stripe.prices.create({
                        art: art.id,
                        unit_amount: arts[i].price*100,
                        currency: 'usd'
                    })

                    line_items.push({
                        price: price.id,
                        quantity: 1
                    })
                } catch (err) {
                    console.log(error)
                }
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
              });

              return { session: session.id }
        },
        customer: async (parent, {sessionId}, context) => {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const customer = await stripe.customers.retrieve(session.customer);
            return (customer.name)
           
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user }
        },
        updateUser: async(parent, args, context) => {
            if(context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true })
            }
            
            throw new AuthenticationError("Account updates can only be made once logged in!")

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
        updateArt: async(parent, { _id, args }) => {
            if(args) {
                return await Art.findByIdAndUpdate(_id, { ...args })
            } else {
                return console.log("Art product has not been updated!")
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