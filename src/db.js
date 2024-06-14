import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export async function connectToDB(){
    try{
        const db = await mongoose.connect(MONGODB_URI);
        console.log('Conection is successfully');
    }catch(error){
        console.error(error)
    }
}