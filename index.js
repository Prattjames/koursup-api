const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const app = express()

const swaggerSpecs = require('./config/swagger')

const mainRoute = require('./ressources/main')
const ingredientsRoute = require('./ressources/ingredients')
const shoppingListsRoute = require('./ressources/shoppingLists')
const usersRoute = require('./ressources/users')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(passport.initialize())

require('./services/passport')(passport)
require('./services/mongoDb')

// SWAGGER API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// ALL ROUTES
app.use('/api/v1/', mainRoute)
app.use('/api/v1/ingredients', ingredientsRoute)
app.use('/api/v1/shopping-lists', shoppingListsRoute)
app.use('/api/v1/users', usersRoute)

app.listen(3000, () => console.log('http://localhost:3000'))