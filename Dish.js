const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({

    dishName: String,
        image: String,
        price: String
     
});

const Dish = mongoose.model('Dish', dishSchema);
Dish.insertMany([
    {
      dishName: "Chicken Burger",
      image: "https://th.bing.com/th/id/OIP.x2vg5HgA4Rl9W12EEh1w1wHaF6?w=256&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7",  // Replace with actual image path or URL
      price: "Rs 224"
    },
    {
      dishName: "Toasted Bread",
      image: "https://th.bing.com/th/id/OIP.HZ7DURVdeSb5Y-K3ZLqt5gHaLG?w=119&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",  // Replace with actual image path or URL
      price: "Rs 155"
    },
    {
      dishName: "Egg Sandwich",
      image: "https://th.bing.com/th/id/OIP.qzmjiuZkF7U-ma_zS6rLgQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",  // Replace with actual image path or URL
      price: "Rs 180"
    },
//     // {
//     //  dishName: "Raspberry Cake",
//     //   image: "https://www.bing.com/images/search?view=detailV2&ccid=ohpZZYdw&id=C2CA0E2BD8328E4023646F546F01F087E0095FED&thid=OIP.ohpZZYdwc4NLnYrtClJ2pQHaF7&mediaurl=https%3a%2f%2fimg.sunset02.com%2fsites%2fdefault%2ffiles%2fchocolate-raspberry-cake-su.jpg&exph=3473&expw=4342&q=raspberry+cake&simid=608051466055057571&FORM=IRPRST&ck=63B91F5420068809FC84E9D4FB54140E&selectedIndex=13&itb=0",  // Replace with actual image path or URL
//     //   price: "Rs 250"
//     // }
  ])
  .then(() => console.log("Data inserted"))
  .catch(err => console.log(err));
  
module.exports = Dish;