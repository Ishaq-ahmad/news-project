import express from 'express'
const router = express.Router()
import { upload}  from "../middlewares/multer.js"
import { dashboard } from '../controller/dashboard.controller.js'

import { allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser ,loginPage,adminLogin, logout,setting, settingPage} from '../controller/userCrud.controller.js'
import { allCategory, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory } from '../controller/category.controller.js'
import { allArticles, addArticlePage, addArticle, updateArticlePage, updateArticle, deleteArticle } from '../controller/articles.controller.js'
import { allComments } from '../controller/comment.controller.js'


// validation Middlewares
import { loginValidation, registerValidation, categoryValidation,articleValidation, userUpdateValidation, articleUpdateValidation } from '../middlewares/validation.js'






// middlewares
import auth from "../middlewares/login.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import multer from 'multer'



// dashboard route
router.get('/dashboard',auth, dashboard)


// Login ROutes
router.get('/', loginPage)
router.post('/index', loginValidation, adminLogin)
router.get('/logout', logout)
router.get('/dashboard',auth, dashboard)
router.get('/setting',auth, isAdmin , settingPage)
router.post('/setting',auth, isAdmin ,upload.single('logo'), setting)


// UserCrud ROutes
router.get('/users',auth, isAdmin , allUser)
router.get('/addUser',auth, isAdmin , addUserPage)
router.post('/addUser',auth,registerValidation, isAdmin , addUser)
router.get('/updateUser/:id', auth, isAdmin , updateUserPage)
router.post('/updateUser/:id',auth, isAdmin ,userUpdateValidation, updateUser)
router.delete('/deleteUser/:id',auth, isAdmin , deleteUser)


// Category ROutes
router.get('/categories',auth, isAdmin ,  allCategory)
router.get('/addCategory',auth, isAdmin , addCategoryPage)
router.post('/addCategory',auth,  isAdmin ,categoryValidation, addCategory)
router.get('/updateCategory/:id',auth, isAdmin , updateCategoryPage)
router.post('/updateCategory/:id',auth,  isAdmin ,categoryValidation, updateCategory)
router.delete('/deleteCategory/:id',auth, isAdmin , deleteCategory)



// Articles routes
router.get('/articles',auth, allArticles)
router.get('/addArticle',auth, addArticlePage)
router.post('/addArticle',auth, upload.single('image'), articleValidation, addArticle)
router.get('/updateArticle/:id',auth, updateArticlePage)
router.post('/updateArticle/:id',auth, upload.single('image'), articleUpdateValidation, updateArticle)
router.delete('/deleteArticle/:id',auth, deleteArticle)


// Comments routes
router.get('/comments',auth, allComments)

// 404 error route
router.use((req,res,next)=>{
    
    res.status(404).render('admin/404', {userRole: req.role, message: 'Page Not Found'});

})


// 500 server error route
router.use(auth,(err , req, res, next)=>{
    
    res.status(500).render('admin/500', {userRole: req.role, message: err});

})

export default router
