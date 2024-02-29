const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    const mongoURI = process.env.MONGO_URI;
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit the process if MongoDB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
