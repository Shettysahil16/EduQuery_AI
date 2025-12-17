import mongoose from 'mongoose';

const connectDB = async() => {
    //console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("error in database connection", error);
    }
}

export default connectDB