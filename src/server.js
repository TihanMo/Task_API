const express = require('express')
const session = require('express-session')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const taskRoutes = require('./task-routes.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//todo user routes

app.use('/tasks', taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, ()=>console.log(`Server listening on port ${port}`))