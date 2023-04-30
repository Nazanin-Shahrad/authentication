import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res ) => {
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






export const login = async (req, res)=> {
    const cookies = req.cookies;

    console.log("cookiessss az front oomade:::",cookies);

    const {username , password } = req.body;

    if(!username || !password){
        return res.status(400).json({message : " username and password should be filled"})
    }

    const foundUser = await User.findOne({username:username}).exec();
    console.log(foundUser);



    if(!foundUser){
        return res.status(401).json({message:"user not found"})
    }

    const match = await bcrypt.compare(password , foundUser.password);

    if(!match){
        return res.status(401).json({message:"password not found"})
    }

    const roles = Object.values(foundUser.roles).filter(Boolean)
    console.log("roles",roles)
    // res.status(200).send("success")

    const accessToken = jwt.sign(
        {
            userInfo : {username : foundUser.username , roles}
         },
         process.env.ACCESS_TOKEN,
         {expiresIn : "5m"}
    )
    console.log("accesstoken:::::",accessToken);

    const newRefreshToken = jwt.sign(
        {
            username : foundUser.username,
        },
        process.env.REFRESH_TOKEN,
        {expiresIn : "1d"}
    );

    console.log("NEW refresh Token ::::::::",newRefreshToken);
    console.log("cookie jwt:?;?:?:" , cookies?.jwt);

    console.log("foundUser.refreshtoken::???", foundUser.refreshToken)

    let newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt)

    console.log("new reftesh token arayyyyyyyyy:::" , newRefreshTokenArray)

    if(cookies?.jwt){
       console.log("NAZANIN",cookies.jwt)
   
        const refreshToken = cookies.jwt;
      
        const foundToken = await User.findOne({refreshToken}).exec();
        // console.log("HAME USERS HAA::", users)
        // const refreshTokens = users[0].refreshToken;
        console.log("foundToken",foundToken)

        // console.log("refresh haye too db :" , refreshTokens)
        
        // console.log("found token for this user:::" , foundToken)

        // if(!foundToken){
        //     newRefreshTokenArray=[]
        // }
        // res.clearCookie("jwt" , {httpOnly:true , sameSite: "None" , secure : true})
    }

    foundUser.refreshToken = [...newRefreshTokenArray , newRefreshToken]
    await foundUser.save();
    console.log("found user jadid :::" , foundUser)

    res.cookie("jwt" , { httpOnly: true , sameSite : "None"  , secure:true , maxAge: 1000 * 60 * 60 * 24});
    res.json({roles , accessToken});

}




