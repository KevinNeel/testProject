import Product from "../models/Product.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Categories = require("../category.json");

export const createProduct = async (req, res) => {
  try {
    const {
      name: name,
      description: description,
      price: price,
      category: category,
    } = req.body;
    console.log(category);
    const productDetails = await Product({
      name: name,
      description: description,
      price: price,
      category: category,
    });
    const products = await productDetails.save();
    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
};

export const getProductList = async (req, res) => {
  try {
    const productList = await Product.find();
    res.render("products", { products: productList });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    res.render("customize", { product: product });
  } catch (error) {
    console.log(error);
  }
};

export const customizeProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    let body = ({} = req.body);
    let updateObj = { $set: {} };

    Object.keys(body).forEach((key) => {
      updateObj.$set[key] = body[key];
    });

    const user = await Product.findOneAndUpdate({ _id: productID }, updateObj, {
      new: true,
    });
    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (req, res) => {
  try {
    res.render("category", { products: Categories });
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const categoryName = req.query.category;
    const category = await Product.find({ category: categoryName });

    res.render("categoryProduct", { products: category });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);
    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
};
