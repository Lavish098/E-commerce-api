const express = require('express')
const { addUser, getUser } = require('../controller/authController')
const router = express.Router()

router.post('/signin', getUser)
router.post('/signup', addUser)


module.exports = router