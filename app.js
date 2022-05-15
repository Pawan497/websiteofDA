const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

//mongoose doc get stareted
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}


//Define Mangoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})

app.get('/information', (req, res)=>{
    const params = {}
    res.status(200).render('information.pug', params);
})

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    let myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Contact has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("Contact not saved in the Database")
    });

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});