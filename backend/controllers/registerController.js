import User from '../models/User.js';
import bcrypt from 'bcrypt';


 const register = async (req, res ) => {
    const { username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({message : "username and password can not be empty!"})
    }

    const duplicateUsername = await User.findOne({username : username});

    if(duplicateUsername) {
        return res.status(409).json({message:"this username is already used!"})
    }

    try {
        const hashedPassword = await bcrypt.hash(password , 15);
        await User.create({
            username ,
            password: hashedPassword,
        })
        res.status(200).json({message: "username is successfully created"});

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export default registerController


