const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require("../models/listing.js");


// database connection
let MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main()
    .then((res) => {
        console.log('connected with DB');
    }).catch((err) => {
        console.log(err, "some error to connectd with database");
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

module.exports = main;


const initiDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "6832d594b62ee03852d8d2ae" }));
    await Listing.insertMany(initdata.data);
    console.log('data was initialized');
}

initiDB();

