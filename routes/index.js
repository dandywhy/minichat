const express = require('express')
const router = express.Router()

const users = require('./modules/users')

router.use('/', users)

module.exports = router