const express = require('express')
const router = express.Router()

const controllers = require('../controllers/usersControllers')

router.post('/auth/register', controllers.register)

router.post('/auth/login', controllers.login)

module.exports = router