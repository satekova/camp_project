const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/camp')
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error("connection error:", err);
  });

const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random()* 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})