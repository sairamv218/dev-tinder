const express = require('express');
const app = express();
app.use('/api' , (req,res) => {
    res.send('Hello! This response is from RAMS API server');
});   
app.use((req,res) => {
    res.send('Hello! This response is from RAMS Backend server');
});



app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})