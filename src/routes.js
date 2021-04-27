const express = require('express')
const routes = express.Router()
const teachersController = require('./app/controllers/teachers')
const studentsController = require('./app/controllers/students')

routes.get('/', (req, res) => res.redirect('/teachers'))

routes.get('/teachers', teachersController.index)
routes.get('/teachers/create', teachersController.create)
routes.get('/teachers/:id', teachersController.show)
routes.get('/teachers/:id/edit', teachersController.edit)
routes.post('/teachers', teachersController.post)
routes.put('/teachers', teachersController.update)
routes.delete('/teachers', teachersController.delete)

routes.get('/students', studentsController.index)
routes.get('/students/create', studentsController.create)
routes.get('/students/:id', studentsController.show)
routes.get('/students/:id/edit', studentsController.edit)
routes.post('/students', studentsController.post)
routes.put('/students', studentsController.update)
routes.delete('/students', studentsController.delete)


module.exports = routes