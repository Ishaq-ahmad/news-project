import express from 'express'
import News from '../models/news.js'
import Category from '../models/category.js'

import Setting from '../models/setting.js'

export const CommonData = async (req, res, next)=>{
    try {

        const setting= await Setting.findOne()
      
    const categoriesInUse= await News.distinct('category')
    const categories= await Category.find({_id: {$in: categoriesInUse}})
    
        res.locals.categories= categories
        res.locals.setting= setting

        next()
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
   

}