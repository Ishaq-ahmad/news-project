import News from "../models/news.js";
import User from "../models/users.js";
import Category from "../models/category.js";
import Comment from "../models/comment.js";

export const dashboard= async(req, res)=>{
    
    let totalArticles;
    if(req.role === 'admin'){
        totalArticles= await News.countDocuments();

    }else{
        totalArticles= await News.countDocuments({author: req.id})
    }

        const totalCategories= await Category.countDocuments();
        // const adminArticles= await News.countDocuments();
        const totalUsers= await User.countDocuments();
        const totalComments= await Comment.countDocuments();

        const authorArticles= await News.find({author: req.id}).countDocuments(); // total articles

        res.render('admin/dashboard', {totalArticles, totalCategories, totalUsers, totalComments, userRole: req.role, fname: req.fname})

    
    
}