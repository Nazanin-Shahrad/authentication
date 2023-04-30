import User from '../models/User.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

 export const handleLogin = async (req, res)=> {
    const cookies = req.cookies;

    const {username , password } = req.body;

    if(!username || !password){
        return res.status(400).json({message : " username and password should be filled"})
    }

    const foundUser = await User.findOne({username:username}).exec();

    if(!foundUser){
        return res.status(401).json({message:"user not found"})
    }

    const match = await bcrypt.compare(password , foundUser.password);

    if(!match){
        return res.status(401).json({message:"password not found"})
    }

    const roles = Object.values(foundUser.roles).filter(Boolean)

    const accessToken = jwt.sign(
        {
            userInfo : {username : foundUser.username , roles}
         },
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn : "5m"}
    )

    const newRefreshToken = jwt.sign(
        {
            username : foundUser.username,
        },process.env.REFRESH_TOKEN_SECRET, {expiresIn : "1d"}
    );

    let newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt)

    if(cookies?.jwt){
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({refreshToken}).exec();

        if(!foundToken){
            newRefreshTokenArray=[]
        }
        res.clearCookie("jwt" , {httpOnly:true , sameSite: "None" , secure : true})
    }

    foundUser.refreshToken = [...newRefreshTokenArray , newRefreshToken]
    await foundUser.save();

    res.cookie("jwt" , { httpOnly: true , sameSite : "None"  , secure:true , maxAge: 1000 * 60 * 60 * 24});
    res.json({roles , accessToken});

}