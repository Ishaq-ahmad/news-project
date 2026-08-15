import mongoose from "mongoose";

const connectDb= async () => mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log(err);
})

export default connectDb