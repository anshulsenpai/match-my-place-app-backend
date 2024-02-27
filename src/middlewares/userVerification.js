const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC_KEY)
        const user = await User.findById(decoded.id)

        if (user.userType !== 'admin' && user.userType !== 'agent') {
            return res.status(403).json({ status: 403, message: 'Access denied. User is not an admin or agent.' })
        }
        req.body.agent = user._id
        next()
    } catch (error) {
        return res.status(401).json({ status: 401, message: 'Invalid token.' })
    }
}

module.exports = { verifyUser }
