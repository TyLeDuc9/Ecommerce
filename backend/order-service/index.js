<<<<<<< HEAD
require('dotenv').config();
=======
require('dotenv').config(); 
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/OrderRoutes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
<<<<<<< HEAD
  .connect(MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 50000,  // Tăng thời gian chọn server
    socketTimeoutMS: 60000,
  })
=======
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
