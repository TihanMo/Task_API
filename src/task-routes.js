const express = require('express')
const router = express.Router()
const fs = require('fs')

let tasks = []

try {
    tasks = JSON.parse(fs.readFileSync( __dirname + '/data/task_data.json', 'utf8'))
} catch (error) {
    console.error('Error reading data', err)
}

const getNextId = () => {
    if (tasks.length === 0) {
        return 1
    }
    const ids = tasks.map(task => task.Id)
    return Math.max(...ids) + 1
}

router.get('/', (req, res) => {
    const id = req.query.id

    if (!tasks) {
        return res.status(500).send('Internal server error')
    }
    if (id){
        const task = tasks.find(t => t.Id === id)
        return res.status(200).send(task)
    }
    res.status(200).json(tasks)
})

router.post('/', (req, res) => {
    const newTask = req.body

    if (!newTask.Titel || !newTask.Beschreibung || !newTask.DueDate || !newTask.ResolvedDate){
        return res.status(406).send('All fields must be filled')
    }

    newTask.Id = getNextId()
    tasks.push(newTask)
    try {
        fs.writeFileSync(__dirname + '/data/task_data.json')
        res.status(201).send(`${newTask.Titel} has been added`)
    } catch (error) {
        res.status(500).send('Error while writing tasks', error)
    }
})

module.exports = router