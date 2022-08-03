"use strict";
const express = require("express");
const router = express.Router();
const productModels = require("../models/productsModel");

router.get("/", async (req, res, next) => {
  const data = await productModels.getProducts();
  res.json(data);
});

router.get("/:id", async (req, res, next) => {
  const row = await productModels.getProduct(req.params.id);
  if (row instanceof Error) return next(row)
  const product = {
    id: row[0].id,
    mark: row[0].mark,
    name: row[0].name,
    description: row[0].description,
    price: row[0].price,
    image: row[0].image,
    
  };
  res.json(product);
});


module.exports = router;
