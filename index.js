const express = require('express');
const mongoose = require('mongoose');
const Dish = require('./Dish'); // Ensure the path to Dish.js is correct

// Connect to MongoDB (Cloud-based MongoDB Atlas connection)
const connectDB = async () => {
  try {
    // Replace with your MongoDB Atlas connection string
    await mongoose.connect('mongodb+srv://chaturya3112:pHIrK4XS9ojR8Tob@Cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Insert initial data only once MongoDB is connected
    Dish.insertMany([
      {
        dishName: 'Chicken Burger',
        image: 'https://th.bing.com/th/id/OIP.x2vg5HgA4Rl9W12EEh1w1wHaF6?w=256&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
        price: 'Rs 224'
      },
      {
        dishName: 'Toasted Bread',
        image: 'https://th.bing.com/th/id/OIP.HZ7DURVdeSb5Y-K3ZLqt5gHaLG?w=119&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
        price: 'Rs 155'
      },
      {
        dishName: 'Egg Sandwich',
        image: 'https://th.bing.com/th/id/OIP.qzmjiuZkF7U-ma_zS6rLgQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        price: 'Rs 180'
      },
    ])
    .then(() => console.log('Data inserted'))
    .catch(err => console.log(err));
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Initialize and configure Express app
const startServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');

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
    const { dishName, price, image } = req.body;
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
    const { dishName, price, image } = req.body;
    await Dish.findByIdAndUpdate(req.params.id, { dishName, price, image });
    res.redirect('/');
  });

  // Start the server
  const PORT = 1170;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Connect to the database and then start the server
connectDB().then(startServer);
