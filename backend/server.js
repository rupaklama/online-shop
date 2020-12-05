// es module import syntax
// just add - "type": "module" in root package.json file
// need to add .js in js files when importing
import express from 'express';

// npm install dotenv
import dotenv from 'dotenv';

// cors request
import cors from 'cors';

// to connect to mongodb 
import connectDB from './config/db.js';

// errors handlers
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// import local data 
// need to add .js in js file here on es module import 
// import products from './data/products.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// .env for our configurations
dotenv.config();

// instance of express app object
const app = express();

// use body parser to except json data in the request body
app.use(express.json())

// use cors middleware
app.use(cors())

// connecting to MangoDB
connectDB();

// api end points
app.get('/', (req, res) => {
  res.send('API is running!')
})

// use routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


// error middleware
app.use(notFound)
app.use(errorHandler)

// dynamic port binding in prod or dev environment
const PORT = process.env.PORT || 5000;

// app object's listen method
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
