import mongoose from 'mongoose'
import { DB_NAME } from "../constant.js"


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  // mongoose gives u an return object
        console.log(`\n MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`) // this is only becoz to check db is connected to which host
    } catch (error) {
        console.log("MONGODB connection error" , error);
        // node.js gives access to process the error
        process.exit(1)
        
    }
}
// this is the long fxn used whenever we try to talk with databse , its best to create a utility fxn nd pass it whenvwer we try to talk to databse , rather than writing this long fxn all the time 
export default connectDB