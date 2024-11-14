
const mongoose = require('mongoose');

// Define the Car Schema
const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String, // URL of the image
      default:"https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80"
    //   required: true,
    }
  ],
  tags: {
    car_type: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    dealer: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ASP_USER', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the Car model
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
 