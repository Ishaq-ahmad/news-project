import {body} from 'express-validator'

export const loginValidation = [
    body('userName')
    .notEmpty()
    .withMessage('Username is required.')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.'),


    body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .trim()
    .isLength({min: 2, max: 8})
    .withMessage('Password must be at least 5 to 8 characters long.')
    .matches(/^\S+$/)
    .withMessage('Password must not contain spaces.')

]


export const registerValidation = [
    body('fname')
    .notEmpty()
    .withMessage('Full name is required.')
    .trim()
    .isLength({min: 2, max: 20})
    .withMessage('Full name must be at least 2 to 20 characters long.'),
  

    body('userName')
    .notEmpty()
    .withMessage('Username is required.')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.'),


    body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .trim()
    .isLength({min: 2, max: 8})
    .withMessage('Password must be at least 5 to 8 characters long.')
    .matches(/^\S+$/)
    .withMessage('Password must not contain spaces.'),

    body('role')
    .notEmpty()
    .withMessage('Role is required.')


]

export const userUpdateValidation = [
    body('fname')
    .notEmpty()
    .withMessage('Full name is required.')
    .trim()
    .isLength({min: 2, max: 20})
    .withMessage('Full name must be at least 2 to 20 characters long.'),

    body('role')
    .notEmpty()
    .withMessage('Role is required.')
]

export const categoryValidation= [
    body('name')
    .notEmpty()
    .withMessage('Category name is required.')
    .trim()
    .isLength({min: 5, max: 18})
    .withMessage('Category name must be at least 5 to 18 characters long.')
    .matches(/^\S+$/)
    .withMessage('Category name must not contain spaces.'),

    body('description')
    .notEmpty()
    .withMessage('Description is required.')

]


export const articleValidation= [
    body('title')
    .notEmpty()
    .withMessage('Title is required.')
    .trim()
    .isLength({min: 5, max: 18})
    .withMessage('Title must be at least 5 to 18 characters long.'),

    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.'),


    body('category')
    .notEmpty()
    .withMessage('Category is required.'),

    // body('image')
    // .notEmpty()
    // .withMessage('Image is required.')

]

export const articleUpdateValidation= [
    body('title')
    .notEmpty()
    .withMessage('Title is required.')
    .trim()
    .isLength({min: 5, max: 18})
    .withMessage('Title must be at least 5 to 18 characters long.'),

    body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.'),

    body('category')
    .notEmpty()
    .withMessage('Category is required.'),

   body('image')
    .optional({checkFalsy: true})
]


export const commentValidation= [
    body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min: 5, max: 12})
    .withMessage('Write Name between 5 - 12 characters'),

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please valid email'),

    body('comment')
    .notEmpty()
    .withMessage('comment is required')
    .isLength({min: 2, max: 20})
    .withMessage('Write comment between 2 - 20 characters'),
]