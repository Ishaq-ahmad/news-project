import { validationResult } from "express-validator";
import Category from "../models/category.js";
import slugify from "slugify";
import News from "../models/news.js";




// ===================================================
//              ADMIN CONTROLLERS
// ===================================================

// ===== Fetch All categories =======
export const allCategory = async (req, res) => {
  try {
    const category = await Category.find();

    res.render("admin/categories/index", {
      category,
      userRole: req.role,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ===== open categoreis page  =======
export const addCategoryPage = async (req, res) => {
  try {
    res.render("admin/categories/create", {
      userRole: req.role,
      errors: [],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ===== Add category post route =======
export const addCategory = async (req, res) => {
  const errors= validationResult(req)
  if(!errors.isEmpty()){
    return res.render('admin/categories/create', {userRole: req.role, errors: errors.array()}, )
  }
  try {
    const category = await Category.create(req.body);

    res.redirect("/admin/categories");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Update category post route =======
export const updateCategory = async (req, res) => {

  try {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
      return res.render('admin/categories/update', {userRole: req.role, errors: errors.array()}, )
    }



    const { name, description } = req.body;

    await Category.findByIdAndUpdate(req.params.id, {
      name,
      description,
      slug: slugify(name).toLowerCase(),
    });

    res.redirect("/admin/categories");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== open update category page =======
export const updateCategoryPage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.render("admin/categories/update", {
      category,
      userRole: req.role,
      errors: [],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



 
// ===== Delete Category =======
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;



    const category = await Category.findById(id);

    const article= await News.findOne({category: id});
    if(article){
      return res.status(400).json({
        success: false,
        message: "This category has in article",
      });
    }
   
      await category.deleteOne();
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};







