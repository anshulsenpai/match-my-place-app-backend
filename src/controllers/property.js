const Property = require('../models/property')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const handleGetProperty = async (req, res) => {
    try {
        let query = {};
        const options = {
            page: parseInt(req.query.page, 10) || 1,
            limit: parseInt(req.query.limit, 10) || 10,
            sort: {
                price: parseInt(req.query.sort, 10) || -1 //Sort by price DESC
            }
        };

        if (req.query.location) {
            query = {
                ...query,
                location: { $regex: new RegExp(req.query.location, 'i') }
            };
        }

        if (req.query.bedrooms) {
            query = {
                ...query,
                bedrooms: parseInt(req.query.bedrooms)
            }
        }

        if (req.query.bathrooms) {
            query = {
                ...query,
                bathrooms: parseInt(req.query.bathrooms)
            }
        }

        if (req.query.bathroomType) {
            query = {
                ...query,
                bathroomType: req.query.bathroomType
            }
        }

        if (req.query.availability) {
            query = {
                ...query,
                availability: req.query.availability
            }
        }

        const matchStage = {
            $match: query
        }

        const matched = Property.aggregate([
            matchStage
        ])
        const data = await Property.aggregatePaginate(matched, options);
        res.status(200).json({ status: 200, data, message: 'Successfully Fetched' })

    } catch (error) {
        console.error('Error fetching properties:', error)
        res.status(500).json({ status: 500, message: error.message })
    }
}

const handleGetOneProperty = async (req, res) => {
    try {
        const _id = req.params.id
        if (!_id) {
            res.status(404).json({ status: 404, message: "Property not found" })
        }
        const data = await Property.findById(_id);
        res.status(200).json({ status: 200, data, message: 'Successfully Fetched' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: error.message })
    }
}

const handlePostProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            bedrooms,
            bathrooms,
            bathroomType,
            location,
            address,
            images,
            availability,
        } = req.body
        const token = req.headers.token
        const agent = jwt.decode(token).id
        const user = await User.findById(agent)

        if (!user) {
            res.status(500).json({ status: 500, message: 'Something went wrong' })
            return
        }

        if (user.userType === 'admin' || user.userType === 'agent') {
            const data = new Property({
                title,
                description,
                price,
                bedrooms,
                bathrooms,
                bathroomType,
                location,
                address,
                images,
                availability,
                agent
            })

            await data.save()
            res.status(201).json({ status: 201, data, message: 'Property added successfully' })

        } else {
            res.status(401).json({ status: 401, message: "Unauthorized" })
        }

    } catch (error) {
        console.error('Error adding property:', error)
        res.status(500).json({ status: 500, message: "Internal server error" })
    }
}

module.exports = {
    handleGetProperty,
    handleGetOneProperty,
    handlePostProperty
}
