// mongoose makes easier to work with MongoDB
// To connect to MongoDB & create database model classes
import mongoose from 'mongoose';

// to connect to mongodb 
const connectDB = async () => {
  // mongoose returns promises
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    
    // 1 to exit with failure
    process.exit(1);
  }
};

export default connectDB;
