import mongoose from 'mongoose'

const connectDb = async() => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}gateway`)
    console.log("✅ MongoDB connection successful")
  } catch (error) {
    console.log("❌ MongoDB connection failed")
    process.exit(1)
  }
}

export default connectDb