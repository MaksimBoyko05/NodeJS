const express = require('express');
const app = express();
let {people} = require('./data.js');

app.use(express.static('./node-express-course/02-express-tutorial/methods-public'));
app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people});
})
//parse form data
app.use(express.urlencoded({extended: false}));

app.post('/login', (req, res) =>{
    const {name} = req.body;
    if(name){
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Please provide name');
})
app.listen(5000, () => {
    console.log('Server is running on port 5000'); 
})