const authName = (req, res, next) => {
  const { name } = req.body
  if (name !== undefined) {
    console.log(req.body)
    next()
  }
}

module.exports = { authName }