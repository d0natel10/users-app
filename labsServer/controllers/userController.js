const db = require('../models')

//create model

const User = db.users

// create user

const addUser = async (req, res) => {
    let info = {
        name: req.body.name,
        userName: req.body.userName,
        role: req.body.role,
        email: req.body.email
    }

    const user = await User.create(info)
    res.status(200).send(user)
} 

//get users all

const getAllUsers = async (req, res) => {
    
    let users = await User.findAll({})
    res.status(200).send(users)
}

// get users by name asc
const getAllUsersSortedByNameASC = async (req, res) => {

    let users = await User.findAll({
        order: [['name', 'ASC']]
    });
    res.status(200).send(users);
};

// get users by name asc
const getAllUsersSortedByNameDESC = async (req, res) => {

    let users = await User.findAll({
        order: [['name', 'DESC']]
    });
    res.status(200).send(users);
};

//update

const updateUsers = async (req, res) => {
    
    let id = req.params.id

    const user = await User.update(req.body, {where: { id: id }})
    res.status(200).send(user)
}

//delete

const deleteUsers = async (req, res) => {
    
    let id = req.params.id

    await User.destroy({where: { id: id }})
    res.status(200).send('user is deleted!')
}

module.exports = {
    getAllUsersSortedByNameASC,
    getAllUsersSortedByNameDESC,
    addUser,
    getAllUsers,
    updateUsers,
    deleteUsers
}