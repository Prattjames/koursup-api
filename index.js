const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const app = express()

const swaggerSpecs = require('./config/swagger')

const mainRoute = require('./routes/main')
const ingredientsRoute = require('./routes/ingredients')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// SWAGGER API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// ALL ROUTES
app.use('/api/v1/', mainRoute)
app.use('/api/v1/ingredients', ingredientsRoute)

app.listen(3000, () => console.log('http://localhost:3000'))