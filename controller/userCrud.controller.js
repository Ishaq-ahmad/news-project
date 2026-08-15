
import bcrypt from "bcryptjs";
import User from "../models/users.js";
import jwt from 'jsonwebtoken'
import Setting from "../models/setting.js";
import dotenv from "dotenv";
dotenv.config()

import fs from 'fs'


import { validationResult } from "express-validator";
import News from "../models/news.js";



export const loginPage = async(req, res) => {
   res.render('admin/login', {layout: false, errors: []});
}


const generateToken=  (userDetail) => {
  return jwt.sign({ id: userDetail.id, userName: userDetail.userName, role: userDetail.role, fname: userDetail.fname}, process.env.JWT_SECRET, { expiresIn: "1d" });
  };

export const adminLogin = async (req, res) => {

  const errors= validationResult(req)
  if(!errors.isEmpty()){
    return res.render('admin/login', {layout: false, errors: errors.array()})
  }
   const {userName, password}= req.body

   if(!userName || !password){
       return res.status(400).json({success : false , messagge: 'All fields are required'})
   }

   const user= await User.findOne({userName})

   if(!user){
       return res.status(404).json({success : false , messagge: 'User not Found'})
   }

   const isMatch= await bcrypt.compare(password, user.password)

   if(!isMatch){
       return res.status(400).json({success : false , messagge: 'Invalid Password'})
   }

   const userDetail= {
     id : user._id,
     userName: user.userName,
     fname: user.fname,
     role: user.role
     
   }
 
   const token = generateToken(userDetail)

   res.cookie('token',token, {httpOnly: true,  maxAge: 24 *60* 60*1000})

   res.redirect('/admin/dashboard')


}



export const logout = (req, res) => {
  res.clearCookie('token')
  res.redirect('/admin/')
}



export const settingPage = async(req, res) => {
  const data= await Setting.findOne()
  res.render('admin/setting', {userRole: req.role, data})

}

// post route
export const setting = async(req, res) => {
  const {title, description}= req.body

  const data= await Setting.findOne()

  if(!data){
    await Setting.create({
      title,
      description,
      logo: req.file.filename
    })
  }

 

  if(data){

    const logoPath= `./public/uploads/${data.logo}`


    if(fs.existsSync(logoPath)){

      fs.promises.unlink(logoPath);
    }

    await Setting.updateOne({},{
      title,
      description,
      logo: req.file.filename
    })
  }

  res.redirect('/admin/users')
 
}









export const allUser= async(req, res)=>{
 
   const user= await User.find()
   res.render('admin/users', {user, userRole: req.role})
}


export const addUserPage= async(req, res)=>{
   res.render('admin/users/create', {userRole: req.role, errors: []})
}

// Add User Post route
export const addUser= async(req, res)=>{
  const errors= validationResult(req)
  if(!errors.isEmpty()){
    return res.render('admin/users/create', {userRole: req.role, errors: errors.array()})
  }

  try {
   const {fname, userName, password, role}=req.body
   if(!fname|| !userName|| !password || !role){
    return  res.send('All fields are required')
   }

   const  existUser= await User.findOne({userName}) 

   if(existUser){
     return res.send('This user already exist')
   }
    await User.create(req.body)
    const user= await User.find()
   res.render('admin/users',{user, userRole: req.role})
  } catch (error) {
    return res.json({success: false, message: error.message})
  }

   
}


export const updateUserPage= async(req, res)=>{
   const id= req.params.id
   const user= await User.findById(id)
   res.render('admin/users/update', { userRole: req.role, user, errors: []})
   
}


export const updateUser= async(req, res)=>{

  const errors= validationResult(req) 
if(!errors.isEmpty()){
  const user= await User.findById(req.params.id)
  return res.render('admin/users/update', {userRole: req.role, user, errors: errors.array()})
}
    try {
      const id = req.params.id
      const {fname, password, role}= req.body


      const user= await User.findById(id)
    if(!user){
      return res.status(404).json({success: false, message: 'user not found'})
    }


    user.fname= fname || user.fname

    if(password){
      user.password= password || user.password
    }

    user.role =  role|| user.role
     await user.save()

       res.redirect('/admin/users')
    } catch (error) {
      return res.status(400).json({success: false, message: error.message})

    }
}



export const deleteUser= async(req, res)=>{
   const id= req.params.id

   const user= await User.findById(id)
    const article= await News.findOne({author: id})
   
    if(!user){
     return res.status(403).json({success: false, message: 'User not found'})
    }
    if(article){
     return res.status(400).json({success: false, message: 'This User are written article do not delete this'})

    }

   await user.deleteOne()
      res.status(200).json({success: true, message: 'User deleted successfully'})
    
   
}



