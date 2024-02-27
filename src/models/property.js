const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bathroomType: {
        type: String,
        enum: ['combined', 'separate'] // Enumerated type for bathroom type
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        required: true
    },
    availability: {
        type: String,
        enum: ['buy', 'sell', 'rent'],
    },
    isSold: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

propertySchema.plugin(aggregatePaginate);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
