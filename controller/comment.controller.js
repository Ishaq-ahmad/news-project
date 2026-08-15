

import Comment from "../models/comment.js";

export const allComments= async(req, res)=>{
   const comments= await Comment.find().populate('articles','title')
   console.log(comments)
   res.render('admin/comments', {comments, userRole: req.role});
}