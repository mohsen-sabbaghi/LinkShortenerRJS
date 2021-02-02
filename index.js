const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();//add to use dotenv file

const app = express();
//Connect to Mongo DB
connectDB();

app.use(express.json({extended: false}));

//define our routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.REACT_APP_PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});

