const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;  // Ensure you have the correct environment variable name

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI, {useUnifiedTopology: true });
    console.log('Connection successful with the database');
  } catch (error) {
    console.error('Failed to connect to the database');
    console.error(`Error: ${error.message}`);
  }
};

module.exports = ConnectDB;
