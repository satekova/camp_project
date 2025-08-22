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
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sint beatae est, possimus, inventore perferendis quidem placeat perspiciatis quaerat magni ipsum, veritatis aperiam explicabo porro quibusdam consequuntur impedit vero debitis?',
            price
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})