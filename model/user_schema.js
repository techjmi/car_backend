const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
    fullName: {
        type: String  
    },
    email: {
        type: String 
    },
    profile_pic: {
        type: String, 
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&s"
    },
    password: {
        type: String 
    },
});

// Create a model from the schema
const ASP_USER = mongoose.model('ASP_USER', User_Schema);

module.exports = ASP_USER;
