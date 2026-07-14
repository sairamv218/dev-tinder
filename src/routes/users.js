const express = require('express');
const usersRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest')


usersRouter.get('/users/requests', userAuth, async (req, res) => {
    try {
        const connectionRequests =
            await ConnectionRequest.find({ toUserId: req.user._id, status: 'interested' }).populate('fromUserId', ['firstName', 'lastName'])

        if ((connectionRequests || []).length > 0) {

            return res.status(200).send({
                message: `${connectionRequests.length} request(s) found`,
                requests: connectionRequests
            });
        } else {
            return res.status(200).send({
                message: `No active requests`,
                requests: []
            });
        }

    }
    catch (err) {
        res.status(500).send({ error: err.message, message: 'Internal Server Error' });
    }

});

usersRouter.get('/users/conections', userAuth, async (req, res) => {
    try {

        const connections = await ConnectionRequest.find(
            {
                $or: [{
                    fromUserId: req.user._id,
                    status: "accepted"
                },
                {
                    toUserId: req.user._id,
                    status: "accepted"
                }]
            }
        ).populate('fromUserId', ['firstName', 'lastName'])
            .populate('toUserId', ['firstName', 'lastName'])

        if ((connections || []).length > 0) {

            const data = connections.map((r) => {
                if (r.fromUserId._id.toString === req.user._id.toString) {
                    return r.toUserId
                }
                return r.fromUserId

            }
            )
            res.status(200).send({
                connctions: data
            })
        } else {
            throw new Error("You dont have any active connections")
        }

    } catch (err) {
        res.status(400).send(err.message);
    }
})

usersRouter.get('/users/feed', userAuth, async (req, res) => {
    try {
        // User should see all the other user cards except
        // his own card
        // somenone ignored him
        // his active connections
        // if he sent alreadt request to someone

        const page  = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perpage) || 5;
        skip = (page-1) * perPage;
        perPage = perPage > 50 ? 50 : perPage

        const connections = await ConnectionRequest.find(
            {
                $or: [{
                    fromUserId: req.user._id
                },
                {
                    toUserId: req.user._id
                }]
            }
        )
        // .populate('fromUserId', ['firstName', 'lastName'])
        //     .populate('toUserId', ['firstName', 'lastName'])


        const notAllowed = new Set([]);
        connections.forEach((r) => {
            notAllowed.add(r.fromUserId.toString());
            notAllowed.add(r.toUserId.toString());
        })

        const users = await User.find(
            { _id: { $nin: [...notAllowed, req.user._id] } }
        ).select('firstName').skip(skip).limit(perPage)

        if ((connections || []).length > 0) {
            res.status(200).send({
                // notAllowed: [...notAllowed ],
                // connections: connections,
                skip:skip,
                perPage:perPage,
                users:users

            })
        } else {
            throw new Error("You dont have anything in feed")
        }

    } catch (err) {
        res.status(400).send(err.message);
    }
})



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

usersRouter.get('/users', userAuth, async (req, res) => {
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



module.exports = { usersRouter };