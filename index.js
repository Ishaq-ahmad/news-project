import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import cookieParser from 'cookie-parser'
app.use(cookieParser())

import expressEjsLayouts from 'express-ejs-layouts'
import path from 'path'
import connectDb from './configs/db.js'
import frontedRoute from './routes/fronted.route.js'
import adminRoute from './routes/admin.route.js'
// import Setting from './models/setting.js'

// middle Wares
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.set('layout', 'layout');

app.use(cors({
    origin: process.env.frontendURL,
    credentials: true
}));


app.use(async (req, res, next)=>{
    const setting= await Setting.findOne()

    res.locals.setting = setting;

    next()
})

await connectDb()
app.set('view engine', 'ejs')


app.use('/', frontedRoute)
app.use('/admin', (req, res, next)=>{
    res.locals.layout= 'admin/layout'
    next()
})

app.use('/admin', adminRoute)

// app.listen(process.env.PORT, ()=>{
//     console.log(`Server running on port ${process.env.PORT}`);
// })

export default app

