import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc  Fetch all products
//@route GET /api/products
//@acess Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //devuelve todos los productos y es una promesa
  // res.status(401)
  // throw new Error('oee')
  res.json(products);
});

//@desc  Fetch single product
//@route GET /api/products/:id
//@acess Public

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

//@desc  delete single product
//@route DELETE /api/products/:id
//@acess Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc  create product
//@route POST /api/products
//@acess Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample b",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc  update a product
//@route PUT /api/products/:id
//@acess Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc  create a new review
//@route PUT /api/products/:id/reviews
//@acess Private

const createProductReview = asyncHandler(async (req, res) => {
  const { 

    rating,
    comment


   } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {

    const alreadyReviewd = products.reviews.find(review => review.user.toString() === req.user._id.toString()) //true si existe
      //por cada review miro si el usuario ya lo escribio
    if (alreadyReviewd) {
        res.status(400)
        throw new Error('product already review')
        
    }

    const review = {
        name:req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,


    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

    await product.save()
    res.status(201).json({ message:'review added'})

    
   
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview
};
