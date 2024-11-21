const userController = require('../controllers/userController.js')

const router = require('express').Router()

router.post('/addUser', userController.addUser)

router.get('/getUsers', userController.getAllUsers)

router.get('/byNameAsc', userController.getAllUsersSortedByNameASC)

router.get('/byNameDesc', userController.getAllUsersSortedByNameDESC)

router.put('/:id', userController.updateUsers)

router.delete('/:id', userController.deleteUsers)

module.exports = router