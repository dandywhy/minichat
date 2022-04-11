const express = require('express')
const router = express.Router()
const { authUser } = require('../../middleware/auth.js')

router.get('/signin', (req, res) => {
  res.render('signin')
})

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router