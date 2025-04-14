const mongoose = require('mongoose');
require("dotenv");
const mongo_url = process.env.DATABASE_URL;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })