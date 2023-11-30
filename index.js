const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.get('/', (req, res)=>{
return res.end("Welcome to E-com App")
}) 
app.use('/products', productRoutes);


// Server setup
app.listen(port,() => {
  console.log(`E-com app listening on port ${port}`);
});
