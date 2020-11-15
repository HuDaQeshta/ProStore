import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @route    GET api/products
// @desc     Get all products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .sort({ ...sortOrder })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @route    GET api/products/:id
// @desc     Get produt by product ID
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed !" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @route    POST api/products/
// @desc     Create a product
// @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    title: "Sample title",
    price: 0,
    user: req.user._id,
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  product.imgs.push("/images/sample.jpg");
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    description,
    brand,
    category,
    countInStock,
    imgs,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
    product.imgs = imgs;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found.");
  }
});

// @route    POST api/products/:id/review
// @desc     Create a new review
// @access   Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed.");
    }
    const review = {
      rating: Number(rating),
      comment,
      name: req.user.name,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product Not Found.");
  }
});

// @route    GET api/products/top
// @desc     Get top products
// @access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
