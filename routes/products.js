"use strict";
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.upload);
const { body, validationResult } = require('express-validator');
const router = express.Router();
const productModels = require("../models/productsModel");

router.get("/", async (req, res, next) => {
  const data = await productModels.getProducts();
  if (data instanceof Error) return next(data)
  res.render("products", { user: req.session.user, data });
});

router.get("/addItem", (req, res) => {
  res.render("addItem");
});

router.post("/addItem", [
  body('mark', "La Marca del producto es requqerida")
  .exists()
  .isLength({ min: 3}),
  body('name', "El nombre del producto es requqrido")
  .exists()
  .trim()
  .isLength({ min: 3}),
  body('description', "La descripcion es requerida")
  .exists()
  .trim()
  .isLength({ min: 3}),
  body('image', "La imagen es requerida")
  .exists()
  .isURL()
  .trim(),
  body('price', "El precio debe ser un número")
  .exists()
  .isNumeric(),
  ], async (req, res, next) => {
    const errors = validationResult(req);
  if(!errors.isEmpty()) {
  const valores = req.body
  const validaciones = errors.array()
  console.log(validaciones)
    res.render('addItem', {validaciones:validaciones, valores: valores})
}else {
  const dbResponse = await productModels.addProduct({ ...req.body });
  if (dbResponse instanceof Error) return next(dbResponse)
  res.redirect("/products");
}}); 



router.get("/handleEdit/:id", async (req, res, next) => {
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
  res.render("handleEdit", { product });
});

router.get("/deleteProduct/:id", async (req, res, next) => {
  const row = await productModels.getProduct(req.params.id)
  await destroy(row[0].image);
  await productModels.deleteProduct(req.params.id);
  if (row instanceof Error) return next(row)
  res.redirect("/products");
});
router.post("/editProduct", async (req, res, next) => {
  const row = await productModels.getProduct(req.body.id);
  if (row instanceof Error) return next(row)
  const data = {
    id: req.body.id,
    mark: req.body.mark,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  };
  await productModels.modifyProduct(data, data.id);
  res.redirect("/products");
})


module.exports = router;
