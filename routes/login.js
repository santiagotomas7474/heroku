"use strict";
const express = require("express");
const comparar = require("../util/passSegured")
const jwt = require("jsonwebtoken");
const router = express.Router();
const mdlUsers = require("../models/mdlUsers");
router.get("/", (req, res) => {
  res.render("login");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.post("/", async (req, res) => {
  const {mail, pass } = req.body;
  const row = await mdlUsers.getUser(mail);
  if (!row.length) {
    const message = "Usuario o Contraseña Incorrectos";
    return  res.render("Login", { message });
  }
    if (await comparar.compare(pass, row[0].user_pass)) {
      const user = {
        _id : row[0].user_id,
        name : row[0].user_name,
        pass : row[0].user_pass,
        mail : row[0].mail
      }
      req.session.user = user;
      res.render("index", {user});
      jwt.sign({ bearer: user }, process.env.jwt_secret, { expiresIn: '1h' }, (err, token) => {
        err ? res.sendStatus(500) : res.send.json({ token })
    })
    } else {
      const message = "Usuario o Contraseña Incorrectos";
      res.render("Login", { message });
    }
});
module.exports = router;
