const router = require('express').Router()

// Router code start

router.get('/ping', (req, res, next) => {
  res.status(200).send({ message: 'pong' })
})

// Router code end

module.exports = router
