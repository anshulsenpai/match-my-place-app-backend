const mongoose = require('mongoose');

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
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
