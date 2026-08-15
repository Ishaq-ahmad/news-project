
import jwt from 'jsonwebtoken'
import User from "../models/users.js";

const auth= async (req, res, next)=>{
   try {
    const token= req.cookies.token

    if(!token){
        return res.redirect('/admin/')
    }

    const decoded=  jwt.verify(token, process.env.JWT_SECRET)

    const user= await User.findById(decoded.id)

    if(!user){
        return res.redirect('/admin/')
    }

    req.id= decoded.id,
    req.fname= decoded.fname,
    req.role= decoded.role
   

    next()


   } catch (error) {
    return res.status(400).json({success : false, message: error.message});

   }
}

export default auth