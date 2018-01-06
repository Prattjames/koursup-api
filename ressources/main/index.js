const express = require('express')
const router = express.Router()

// ROUTES
const mainRoute = require('./main.main')

router.get('/', mainRoute)

module.exports = router