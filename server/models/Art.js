const mongoose = require('mongoose')

const { Schema } = mongoose

const artSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

const Art = mongoose.model('Art', artSchema)

module.exports = Art