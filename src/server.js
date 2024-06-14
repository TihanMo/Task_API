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

const users = [
    { email: 'admin', password: 'password' },
    { email: 'user', password: '123456' },
    { email: 'desk@library.example', password: 'm295' },
    { email: 'zli', password: 'zli1234'},
    { email: 'm295', password: 'm295'}
]

app.get('/', (req, res) => {
    res.status(301).redirect('/api-docs')
})

app.post('/login', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to login a user.'
        #swagger.parameters['user'] = {
            in: 'body',
            description: 'Details of the user to add.',
            required: true,
            schema: {
                email: 'desk@library.example',
                password: 'm295'
            }
        } */
    const { email, password } = req.body

    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
        req.session.user = email
        res.status(201).send('Login successful')
    } else {
        res.status(401).send('Invalid email or password')
    }
})

app.get('/verify', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to verify if the user is logged in.' */
    if (req.session.user != null) {
        res.status(200).send(`User ${req.session.user} is logged in`)
    } else {
        res.status(200).send('User not logged in')
    }
})

app.delete('/logout', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to logout a user.' } */
    req.session.destroy((err) => {
        if (err) {
        console.error('Error destroying session:', err)
        res.sendStatus(500)
        } else {
        res.status(204).send('Logged out successfully')
        }
    })
})

app.use('/tasks', taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, ()=>console.log(`Server listening on port ${port}`))