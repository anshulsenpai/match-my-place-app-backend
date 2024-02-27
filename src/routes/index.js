const router = require("express").Router()
const { handleRegister, handleLogin } = require("../controllers/auth")
const { handleGetProperty, handlePostProperty, handleGetOneProperty } = require("../controllers/property")
const hashPass = require("../middlewares/hashpass")

// auth route
router.post('/auth/register', [hashPass], handleRegister)
router.post('/auth/login', handleLogin)

// property routes
router.get('/properties/all', handleGetProperty)
router.get('/properties/:id', handleGetOneProperty)
router.post('/properties/post', [], handlePostProperty)


// admin routes



// member routes



// agent routes

module.exports = router