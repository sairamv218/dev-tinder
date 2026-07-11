const express = require('express');
const { connectDB } = require('./config/database');
const app = express();
const User = require('./models/user');
app.use(express.json());


connectDB().then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log('Database connection failed', err);
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const user = new User({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    })

    await user.save().then(() => {
        res.status(201).send('User created successfully');
    }).catch((err) => {
        res.status(400).send('Error creating user');
    });
})

app.use('/', (err,req,res,next)=>{
    if(err){
        res.status(500).send({error:err,message:'Internal Server Error'});
    }
})