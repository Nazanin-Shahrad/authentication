import User from '../models/User.js';
import bcrypt from 'bcrypt';


 const register = async (req, res ) => {
    const { username , password} = req.body;
    //password or username was empty and user didn't find out the form -->caused bad request
    if(!username || !password){
        return res.status(400).json({message : "username and password can not be empty!"})
    }

    const duplicateUsername = await User.findOne({username : username});
    //if we have already have this username in our database , related status code to conflict is 409
    if(duplicateUsername) {
        return res.status(409).json({message:"this username is already used!"})
    }
    //before saving these info into the database , we should hash the password ,, ssuccessfully done status code is 201
    try {
        const hashedPassword = await bcrypt.hash(password , 15);
        await User.create({
            username ,
            password: hashedPassword,
        })
        res.status(201).json({message: "username is successfully created"});

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export default registerController


