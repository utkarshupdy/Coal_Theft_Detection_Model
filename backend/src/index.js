// require('dotenv').config({path: './env'}) // Although its work perfect BUT BUT this breaks the consistency of code , as in our project we used module.js (import statements)
import dotenv from 'dotenv'
import { app } from './app.js';
dotenv.config({         // as this feature is experimental , to use this , we have to add some code in package.json at scripts-->dev line
    path: './.env'
})


// import mongoose from 'mongoose'
// import { DB_NAME } from './constants';
import connectDB from "./db/connect.js";

connectDB() // as we code it asyncronously , it return promises
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port :  ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB connection failed !!! " , error);
})
