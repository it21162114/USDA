const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected successfully');
    }).catch((err) => {
        console.log('Error in MongoDB', err);
    })