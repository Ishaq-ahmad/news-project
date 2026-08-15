import mongoose from "mongoose"

import Category from "../models/category.js"
import News from "../models/news.js"
import Comment from "../models/comment.js"
import user from '../models/users.js'
import  Setting from '../models/setting.js'


// =====================================================================================
              // FRONTED CONTROLLERS
// =====================================================================================

export const home= async (req, res)=>{          

    const articles= await News.find().populate('category').populate('author').sort({createdAt: -1})
    
    res.render('home', {articles})
   
    
}



export const articleByCategories= async (req, res)=>{

    const category= await Category.findOne({slug: req.params.slug})

    const articles= await News.find({category: category._id}).populate('author').populate('category').sort({createdAt : -1})

    const categoriesInUse= await News.distinct('category')
    const categories= await Category.find({_id : {$in : categoriesInUse}})
    res.render('category', {articles, category, categories});
}


// ====== open single page ========
export const singleArticle= async (req, res)=>{



   const articles= await News.findById(req.params.id).populate('author').populate('category')

   const categoriesInUse= await News.distinct('category')
   const categories= await Category.find({ _id : {$in : categoriesInUse} })

    const comments = await Comment.find({articles: req.params.id}).sort({createdAt: -1})
  
  
   res.render('single', {categories, articles,comments});

}

// ====== SEARCH =======
export const search= async (req, res)=>{
    const searchQuery= req.query.search;
    const articles= await News.find({title: {$regex: searchQuery, $options : 'i'}}).populate('category').populate('author')

    const categoriesInUse= await News.distinct('category')
    const categories= await Category.find({ _id : {$in : categoriesInUse} })
    res.render('search', {articles, categories, searchQuery});
}



// ====== articles by author/admin =======
export const author= async (req, res)=>{
    const articles= await News.find({author: req.params.id}).populate('author').populate('category')

    const categoriesInUse= await News.distinct('category')
    const categories= await Category.find({_id: {$in: categoriesInUse}})
    res.render('author',{articles,categories});
}


//  ========= add comment on article =========
export const addComment= async (req, res)=>{

    
    await Comment.create({
        articles: req.params.id,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    })

   res.redirect('/');




}







