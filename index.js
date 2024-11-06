const express = require('express');
const mongoose = require('mongoose');
const Dish = require('./Dish'); // Ensure the path to dish.js is correct

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/restaurant170')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Route to get the home page with the list of dishes
app.get('/', async (req, res) => {
    const dishes = await Dish.find({});
    res.render('home', { dishes });
});

// Route to render the dish creation form
app.get('/form', (req, res) => {
    res.render('form');
});

// Route to handle creating a new dish
app.post('/dishes', async (req, res) => {
    const { dishName, price, image, } = req.body;
    const dish = new Dish({ dishName, price, image });
    await dish.save();
    res.redirect('/');
});

// Route to handle deleting a dish
app.post('/dishes/delete/:id', async (req, res) => {
    await Dish.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Route to render the edit form
app.get('/dishes/edit/:id', async (req, res) => {
    const dish = await Dish.findById(req.params.id);
    res.render('edit', { dish });
});

// Route to handle updating a dish
app.post('/dishes/update/:id', async (req, res) => {
    const { dishName, price, image} = req.body;
    await Dish.findByIdAndUpdate(req.params.id, { dishName, price, image });
    res.redirect('/');
});

// Start the server
app.listen(1170, () => {
    console.log('Server running on port 1170');
});