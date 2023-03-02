import mongoose from "mongoose";

const connectDB = (url) => {
     mongoose.set('strictQuery', true)

     mongoose.connect(url, {
          useUnifiedTopology: true,
          useNewUrlParser: true
     })
     .then(() => console.log('MongoDB Database connected!'))
     .catch((err) => {
          console.error('Failed to connect with MongoDB Database!');
          console.error(err)
     })
}

export default connectDB;