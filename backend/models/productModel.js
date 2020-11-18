import mongoose from 'mongoose';

// it can be in a separate file but we are using only here 
// & it is small
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// Using Schema object to create different properties for this new collection.
// Schema will describe what each individual record with all db properties.
const productSchema = mongoose.Schema({
  // need to create relationship between User & Product Collections because 
  // each user has their own set of products
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // creating relation with User collection in db
    ref: 'User' 
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // array of review objects 
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
}, { 
  // instead of creating createdAt & updatedAt fields above 
  // with mongoose we can pass second arg of option of timestamps prop &
  // it will create createdAt & updatedAt fields automatically
  timestamps: true
})

// telling mongoose to create new model class instance - Product
// first arg - name of the collection & second arg - name of the the Schema
const Product = mongoose.model('Product', productSchema)

export default Product;
