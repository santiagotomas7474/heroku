"use strict";
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.upload);
const router = express.Router();
const productModels = require("../models/productsModel");


router.get("/", async (req, res) => {
   await res.render("carrito");
});

router.get("/carrito/:id", async (req, res) => {
  const row = await productModels.getProduct(req.params.id);
  const product = {
    id: row[0].id,
    mark: row[0].mark,
    name: row[0].name,
    description: row[0].description,
    price: row[0].price,
    image: row[0].image,
    
  };
  res.redirect("/products", { product });
});
module.exports = router;