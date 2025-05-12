require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/CartRoutes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/cart', cartRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
