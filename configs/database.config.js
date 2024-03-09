const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URL

// connection to database
const connectDB = async () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('Database connected sucessfully');
        })
        .catch((err) => {
            console.log('Database connection failed', err);
            console.log('Reconnecting to Database', err);
            connectDB();
        })
}

module.exports = connectDB;