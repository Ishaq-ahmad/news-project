import { validationResult } from "express-validator";
import Category from "../models/category.js";
import News from "../models/news.js";
import User from "../models/users.js";
import fs from 'fs'

export const allArticles = async (req, res) => {
  try {
    let articles;
    if (req.role === "admin") {
      articles = await News.find().populate("author").populate("category");
    } else {
      articles = await News.find({ author: req.id })
        .populate("author")
        .populate("category");
    }

    res.render("admin/articles/index", {
      articles,
      userRole: req.role,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// addArticle post route
export const addArticle = async (req, res) => {
 
  try {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
      const categories = await Category.find();
      return res.render('admin/articles/create', {userRole: req.role, categories, errors: errors.array()})
    }
    const { title,  category, content } = req.body;

    await News.create({
      title,
      category,
      author: req.id,
      content,
      image: req.file.filename,
    });

    res.redirect("/admin/articles");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addArticlePage = async (req, res) => {
  try {
    const categories = await Category.find();

    res.render("admin/articles/create", {
      userRole: req.role,
      categories,
      errors: [],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
     
    });
  }
};

// post route of update article
export const updateArticle = async (req, res) => {
 
  try {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
      const article= await News.findById(req.params.id);
      const categories = await Category.find();
      return res.render('admin/articles/update', {userRole: req.role,article,categories, errors: errors.array()})
    }


    const article = await News.findById(req.params.id);

    const id = req.params.id;
    const { title, category, content } = req.body;

    article.title = title;
    article.content = content;
    article.category = category;

  
    if (req.file) {
      if(fs.existsSync('./public/uploads/'+ article.image)){

        fs.unlinkSync('./public/uploads/' + article.image);

      }

      article.image = req.file.filename;
      
      
    }

    if (req.role == "author") {
      if (req.id.toString() != article.author._id.toString()) {
        return res.send("unauthorized");
      }
    }

    await article.save();
    res.redirect("/admin/articles");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateArticlePage = async (req, res) => {
  try {



    const article = await News.findById(req.params.id)
      .populate("category")
      .populate("author");

      if (req.role === "author") {
        if (req.id != article.author._id) {
          return res.send("unauthorized");
        }
      }
    const categories = await Category.find();

    res.render("admin/articles/update", {
      userRole: req.role,
      article,
      categories,
     errors: [],
      
    });

    
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;

    // check user because author are not delete  admin article
    if (req.role === "author") {
      if (req.id != article.author._id) {
        return res.send("unauthorized");
      }
    }

     //find image 
    const article = await News.findById(id);
    const image= article.image

    //delete article
    await News.findByIdAndDelete(id);

   
    //  delete image from database and uploads folder
    
      if(fs.existsSync('./public/uploads/'+ image)){

        fs.unlinkSync('./public/uploads/' + image);

      }

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};