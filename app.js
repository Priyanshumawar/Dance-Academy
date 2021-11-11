const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 800;

//  vdefine mongoose schema
var contactschema= new mongoose.Schema({
    name: string,
    phone: string,
    email: string,
    address: string,
    desc: string
    
});

var contact = mongoose.model('contact',contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine a\s pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('contact.pug',params);
})


app.post('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item hasbeen saved to the database")
    }).catch(()=>{
        res.status(400).send("this item was not saved to the database")
    });
    //  res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});