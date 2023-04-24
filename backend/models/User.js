import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required,
    },
    roles: {
        User:{type:Number , default:1000},
        Editor:Number,
        Admin:Number,
    },
    password: {
        type:String,
        required,
    },
    refreshToken:[String]
});

export default mongoose.model("User" , userSchema);