require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/CustomerRoutes');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/api', customerRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000, // Giảm thời gian chờ kết nối
    socketTimeoutMS: 45000
  })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
