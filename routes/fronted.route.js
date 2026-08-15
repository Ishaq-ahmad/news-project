import express from 'express'
 
const router= express.Router()

import { search, author, articleByCategories, home, singleArticle, addComment } from '../controller/site.controller.js'

import {commentValidation} from '../middlewares/validation.js'


import { CommonData } from "../middlewares/loadCommonData.js"

router.use(CommonData)
router.get('/', home)
router.get('/category/:slug', articleByCategories)
router.get('/single/:id', singleArticle)
router.get('/search', search)
router.get('/author/:id', author)
router.post('/comment/:id', commentValidation, addComment)


export default router