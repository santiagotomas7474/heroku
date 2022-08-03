"use strict";
const express = require("express");
const router = express.Router();
const { encrypt } = require("../util/passSegured");
const jwt = require("jsonwebtoken");
const regUser = require("../models/registerUser");
const { body, validationResult } = require('express-validator');
router.get("/", (req, res) => {
    res.render("register");
  });


  router.post("/", [
  body('user', "nombre del usuario requerido, minimo: 3 caracteres")
  .exists()
  .isLength({ min: 3, max: 90 }),
  body('mail', "ingrese E-mail valido")
  .exists()
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('pass', "Contraseña requerida, minimo: 8 caracteres")
  .exists()
  .trim()
  .isLength({ min: 8, max: 20 }),
  ],async (req, res ) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
  const valores = req.body
  const validaciones = errors.array()
  console.log(validaciones)
    res.render('register', {validaciones:validaciones, valores: valores})
}else {
    const { user, mail, pass } = req.body;
    const hash = await encrypt(pass)
    const data = await regUser.addData(user, hash, mail)

    if (data != undefined) {
      const dataSave = sessionStorage.setItem("data", JSON.stringify(data));
      req.session.user = user;
      res.render("index", { user }, dataSave);
      jwt.sign({ bearer: user }, process.env.jwt_secret, { expiresIn: '1h' }, (err, token) => {
      err ? res.sendStatus(500) : res.send.json({ token })
      })} else {
      return (err)
    }
}
  

}); 
  module.exports = router;
