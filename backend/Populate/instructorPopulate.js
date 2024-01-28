const Instructor = require('../models/Instructor');
const instructors = require('./instructors.json');

const connectDB = require('../db/connect');
require('dotenv').config();
connectDB(process.env.MONGO_URI);

const populateinstructors = async () => { 
    try{await Instructor.deleteMany();
        await Instructor.create(instructors);
        console.log('instructors created');
    }
    catch(error){
        console.log(error);
    }
}
populateinstructors();