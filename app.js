const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/camp')
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error("connection error:", err);
  });

const Campground = require('./models/campground')

const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/new', async (req, res) => {
    const camp = new Campground({
        title: 'Gerhardhof',
        description: 'Gerhardhof - Zimmer Glamping Camping in Wildermieming offers family rooms with private bathrooms, balconies, and garden views. Each unit includes a terrace, sofa bed, and modern amenities such as free WiFi, air conditioning, and a work desk.'
    });
    await camp.save();
    res.send(camp);
})

app.listen(port, () => {
    console.log(`Lstening on port ${port}`)
})