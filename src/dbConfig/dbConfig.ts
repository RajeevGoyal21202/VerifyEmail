import { error } from "console";
import mongoose from "mongoose";

export async function connectDb(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('Mongo DB connected')
        })
        connection.on('error',(err)=>{
            console.log('Mongodb connection error'+err);
            process.exit()
        })
    }
    catch(error){
        console.log('Something Went wrong in connecting to Db')
        console.log(error)
    }
}