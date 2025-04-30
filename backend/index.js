require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./cart-service/routes/CartRoutes');
const addressRoutes = require('./addressCustomer-service/routes/AddressRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Thêm các route của cart và address vào cùng một ứng dụng
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
    connectTimeoutMS: 45000, // 45 seconds timeout for initial connection
  })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
