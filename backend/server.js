// common js module import syntax
const express = require('express');

// cors request
const cors = require('cors');

// import local data 
const products = require('./data/products');

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
const PORT = process.env.PORT || 7000;

// app object's listen method
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
