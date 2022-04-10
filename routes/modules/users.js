const express = require('express')
const router = express.Router()
const { authUser } = require('../../middleware/auth.js')

router.get('/signin', (req, res) => res.render('signin'))

router.get('/', authUser, (req, res) => {
  const { username } =  req.query
  res.render('index')
})

module.exports = router