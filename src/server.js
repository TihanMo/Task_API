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
        console.log(`User logged in: ${req.session.user}`)
        res.status(201).json({ message: 'Login successful' })
    } else {
        res.status(401).json({ error: 'Invalid email or password' })
    }
})

app.get('/verify', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to verify if the user is logged in.' */
    if (req.session.user != null) {
        res.status(200).json({ message: `User ${req.session.user} is logged in` })
    } else {
        res.status(200).json({ message: 'User not logged in' })
    }
})

app.delete('/logout', (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.description = 'Endpoint to logout a user.' } */
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err)
            res.status(500).send('Failed to logout')
        } else {
            res.status(204).send('Logged out successfully')
        }
    })
})

app.use('/tasks', taskRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(port, ()=>console.log(`Server listening on port ${port}`))
