const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Task API',
        description: 'Documentation for all endpoints of \'Task API\''
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: []
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server')
})
