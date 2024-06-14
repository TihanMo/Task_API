const express = require('express')
const router = express.Router()
const fs = require('fs')

let tasks = []

try {
    tasks = JSON.parse(fs.readFileSync( __dirname + '/data/task_data.json', 'utf8'))
} catch (error) {
    console.error('Error reading data', error)
}

const getNextId = () => {
    const ids = tasks.map(task => task.Id)
    for (let i = 1; i <= ids.length + 1; i++) {
        if (!ids.includes(i)) {
            return i
        }
    }
}

router.get('/', (req, res) => {
    const id = parseInt(req.query.id, 10)

    if (!tasks) {
        return res.status(500).send('Internal server error')
    }
    if (id){
        const task = tasks.find(t => t.Id === id)
        return res.status(200).send(task)
    }
    res.status(200).json(tasks)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const task = tasks.find(t => t.Id === id)

    if(task){
        res.status(200).send(task)
    } else {
        res.status(404).send('Task not found')
    }
})

router.post('/', (req, res) => {
    const newTask = req.body

    if (!newTask.Titel || !newTask.Beschreibung || !newTask.DueDate || !newTask.ResolvedDate){
        return res.status(406).send('All fields must be filled')
    }
    const taskId = getNextId()
    const taskFormatId = {Id: taskId, ...newTask} 

    tasks.push(taskFormatId)
    try {
        fs.writeFileSync(__dirname + '/data/task_data.json', JSON.stringify(tasks, null, 2))
        res.status(201).send(`${newTask.Titel} has been added`)
    } catch (error) {
        res.status(500).send('Error while writing tasks')
    }
})

router.put('/', (req, res) => {

})

router.patch('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})

module.exports = router