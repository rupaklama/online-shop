// es module import syntax
// just add - "type": "module" in root package.json file
// need to add .js in js files when importing
import express from 'express';

// npm install dotenv
import dotenv from 'dotenv';

// cors request
import cors from 'cors';

// import local data 
// need to add .js in js file here on es module import 
import products from './data/products.js';

// .env for our configurations
dotenv.config();

// instance of express app object
const app = express();

// use cors middleware
app.use(cors())

// api end points
app.get('/', (req, res) => {
  res.send('API is running!')
})

// products
app.get('/api/products', (req, res) => {
  res.send(products)
  // same as above - res.json(products)
})

// single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id)
  res.json(product)
})


// dynamic port binding in prod or dev environment
const PORT = process.env.PORT || 5000;

// app object's listen method
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
