require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const orderDetailsRoutes = require('./routes/OrderDetailsRoutes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/orderDetails', orderDetailsRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

<<<<<<< HEAD
console.log('Connecting to MongoDB with URL:', MONGO_URL);
=======
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
<<<<<<< HEAD
  .catch((err) => {
    console.error("DB connection error:", err);
  });
=======
  .catch((err) => console.log(err));
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
