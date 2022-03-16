import express from "express";
const app = express();
import methodOverride from "method-override";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

import connDB from "./db/db_conn.js";
connDB();

import {
  createProduct,
  getProductList,
  deleteProduct,
  getProduct,
  customizeProduct,
  getCategory,
  getCategories
} from "./controllers/product_Controllers.js";

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/customize/:id", getProduct);

app.post("/customize/:id", customizeProduct);

app.get("/products", getProductList);

app.get("/categories", getCategories);

app.get("/category", getCategory);

app.post("/", createProduct);

app.delete("/delete/:id", deleteProduct);

app.listen(8000, () => {
  console.log("Server is running ");
});
