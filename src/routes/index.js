const router = require("express").Router()
const { handleRegister, handleLogin } = require("../controllers/auth")
const hashPass = require("../middlewares/hashpass")

// auth route
router.post('/auth/register', [hashPass], handleRegister)
router.post('/auth/login', handleLogin)



module.exports = router