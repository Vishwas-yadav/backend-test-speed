require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware
app.use(cors()); // Enable CORS for all routes

const userRouter=require('./modules/user/index');
const adminRouter=require('./modules/admin/index');
const locationRouter=require('./modules/location/index');

app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/loc',locationRouter);
app.get('/api/dummy', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
