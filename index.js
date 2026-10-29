
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDb from './configs/db.js';
import frontedRoute from './routes/fronted.route.js';
import adminRoute from './routes/admin.route.js';
import Setting from './models/setting.js';

dotenv.config();

const app = express();

// Resolve the project directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files: CSS, JavaScript, images, uploads
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.set('layout', 'layout');

// CORS
app.use(
  cors({
    origin: process.env.frontendURL,
    credentials: true,
  })
);

// Database connection
await connectDb();

// Common settings for EJS views
app.use(async (req, res, next) => {
  try {
    const setting = await Setting.findOne();
    res.locals.setting = setting;
    next();
  } catch (error) {
    next(error);
  }
});

// Frontend routes
app.use('/', frontedRoute);

// Admin layout and routes
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin/layout';
  next();
});

app.use('/admin', adminRoute);

// Start server locally; Vercel imports the app
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
