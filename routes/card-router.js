const express = require('express')
const router = express.Router()

const {
    getCards
} = require('../controllers/card-controller')

router.get('/api/items', getCards)


module.exports = router