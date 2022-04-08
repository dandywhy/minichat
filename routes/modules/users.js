const express = require('express')
const router = express.Router()

router.get('/signin', (req, res) => res.render('signin'))
router.post('/signin', (req, res) => res.redirect('/'))

router.get('/', (req, res) => {
  const { name } =  req.query
  console.log(name)
  res.render('index')
})

module.exports = router