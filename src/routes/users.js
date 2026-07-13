const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');

usersRouter.put('/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(400).send('Error updating user');
        });
});

usersRouter.get('/users', async (req, res) => {
    await User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).send('Error fetching users');
        });
});


usersRouter.patch('/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(400).send('Error updating user');
        });
});

usersRouter.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send('User deleted successfully');
        })
        .catch(() => {
            res.status(500).send('Error deleting user');
        });
});



module.exports = {usersRouter};