import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log("CONECTADO A MONGOOSE RUSKI")
    }catch(error){
        console.log("Error")
    }
}
export default connectDB;