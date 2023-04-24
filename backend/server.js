import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();


// const connectDB= async () => {
//     try{
//         await mongoose.connect(process.env.MONGO )
//     }
//     catch(err){
//         console.log(err);

//     }
// }

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        // console.log("connected to mongoDB.")
    } catch(error){
        console.log(error)
    }
}

const PORT = process.env.PORT || 8000;
connect();

mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  });

// app.listen(PORT , () => {
//     connect();
//     console.log("Backend server is running !");
//     console.log(`Example app listening on port ${PORT}!`)
// })


