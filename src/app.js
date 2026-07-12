const express = require('express');
const { connectDB } = require('./config/database');
const app = express();
const User = require('./models/user');
const { userSignupValidation } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());
app.use(express.json());


connectDB().then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Database connection failed', err);
});

app.get('/profile', async (req, res) => {
    const cookie = req.cookies;
    const idfromdecodedToken = jwt.verify(cookie.token, 'devtinder@2026');

    console.log(idfromdecodedToken);

    let user = await User.findById(idfromdecodedToken._id);

    console.log(user);  
    res.status(200).send(user);
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Invalid Credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // create a JWT token and send it in the response put it in cookie

        const token  = jwt.sign({ _id: user._id }, 'devtinder@2026', { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });


        if (!isPasswordValid) {
            return res.status(401).send('Invalid Credentials');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.post('/signup', async (req, res, next) => {
    console.log(req.body);
    try{

        userSignupValidation(req, res, next);

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        password: passwordHash
    })

    await user.save().then(() => {
        res.status(201).send('User created successfully');
    })
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

app.put('/users/:id', async (req, res) => {
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

app.get('/users', async (req, res) => {
    await User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).send('Error fetching users');
        });
});


app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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


app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send({ error: err, message: 'Internal Server Error' });
    }
})