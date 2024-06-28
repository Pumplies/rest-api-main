const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardsSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Cards = mongoose.model('cards', cardsSchema)

module.exports = Cards;