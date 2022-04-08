const express = require('express')
const router = express.Router()
const { authName } = require('../../middleware/auth.js')

router.get('/signin', (req, res) => res.render('signin'))
router.post('/signin', (req, res) => res.redirect('/'))

router.get('/', (req, res) => {
  const { name } =  req.query
  // console.log(req)
  res.render('index')
})

module.exports = router