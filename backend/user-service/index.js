require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
// const userRoutes = require('./routes/UserRoutes');
// const sellerRoutes = require('./routes/SellerRoutes');
const authRoutes = require('./routes/AuthRoutes');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/seller', sellerRoutes);


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
