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

const userAuth = (req, res, next) => {
    if (req.session.user == null) {
        return res.sendStatus(403);
    }
    next()
}

router.get('/', userAuth, (req, res) => {

    const id = parseInt(req.query.id)

    if (!tasks) {
        return res.status(500).send('Internal server error')
    }
    if (id){
        const task = tasks.find(t => t.Id === id)
        return res.status(200).send(task)
    }
    res.status(200).json(tasks)
})

router.get('/:id', userAuth, (req, res) => {
    const id = parseInt(req.params.id)
    const task = tasks.find(t => t.Id === id)

    if(task){
        res.status(200).send(task)
    } else {
        res.status(404).send('Task not found')
    }
})

router.post('/', userAuth, (req, res) => {
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

router.put('/:id', userAuth, (req, res) => {
    const updatedTask = req.body
    const id = parseInt(req.params.id)

    if (!updatedTask || !id) {
        return res.sendStatus(400).send('Pls provide Task in body')
    }

    const taskIndex = tasks.findIndex(t => t.Id === id)

    if (taskIndex === -1) {
        return res.send(404).send('Task not found')
    }

    tasks[taskIndex] = { Id: id, ...updatedTask }

    try {
        fs.writeFileSync(__dirname + '/data/task_data.json', JSON.stringify(tasks, null, 2))
        res.status(201).send(`${updatedTask.Titel} has been updated`)
    } catch (error) {
        res.status(500).send('Error while writing tasks')
    }
})

router.patch('/:id', userAuth, (req, res) => {
    const id = parseInt(req.params.id)
    const updatedFields = req.body
    const taskIndex = tasks.findIndex(t => t.Id === id)

    if (taskIndex === -1) {
        return res.status(404).send('Task not found')
    }

    const updatedTask = { ...tasks[taskIndex], ...updatedFields }
    tasks[taskIndex] = updatedTask

    try {
        fs.writeFileSync(__dirname + '/data/task_data.json', JSON.stringify(tasks, null, 2))
        res.status(200).send(`${updatedTask.Titel} has been updated`)
    } catch (error) {
        res.status(500).send('Error while writing tasks')
    }
})

router.delete('/:id', userAuth, (req, res) => {
    const id = parseInt(req.params.id)

    if (!id) {
        return res.sendStatus(400).send('Pls provide id')
    }

    const taskIndex = tasks.findIndex(t => t.Id === id)

    if (taskIndex === -1) {
        return res.send(404).send('Task not found')
    }

    tasks.splice(taskIndex, 1)

    try {
        fs.writeFileSync(__dirname + '/data/task_data.json', JSON.stringify(tasks, null, 2))
        res.status(204).send(`Task has been deleted`)
    } catch (error) {
        res.status(500).send('Error while writing tasks')
    }
})

module.exports = router