import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';
import cookieParser from 'cookie-parser';
const createToken=(userId,res)=>{
const token=jwt.sign({userId},process.env.JWT_TOKEN,{expiresIn:"10d"});
console.log("hi");
console.log(userId);
res.cookie("jwt",token,{
    httpOnly:true,//xss
    secure: process.env.NODE_ENV === "production",//csrf
    sameSite:"none",//csrf
});
console.log("Token: from server",token);
return token;
};
export default createToken;