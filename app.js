const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload")
const hbs = require("hbs");
const session = require("express-session");
const morgan = require("morgan");
const PORT = 3006;
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(cors())
app.use(fileupload({
  useTempFiles: true, 
  tempFileDir: "/tmp/",
}))

const data = require("./routes/datos")
const contra = require("./routes/contra");
const carro = require("./routes/compras");
const contact = require("./routes/contact"); 
const routeProducts = require("./routes/products");
const routeRegister = require("./routes/register");
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");

app.use(express.static(path.resolve(__dirname, "./client/dist")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "./views/partials"));


app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

const isAuth = (req, res, next) => {
  app.locals.user = req.session.user;
  next();
};

app.use(morgan('tiny'));

app.use ("/contra", contra)
app.use ("/carrito", carro)
app.use ("/contact",isAuth, contact)
app.use("/products", routeProducts)
app.use("/register", routeRegister);
app.use("/", routeIndex);
app.use("/login", routeLogin);
app.use("/datos", data);

app.get("/react", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "react.html"))
})
app.get("/react/cart", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "react.html"))
})



//catch all route (404)
app.use((req, res, next) => {
  let error = new Error("Recurso no encontrado");
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  if (!error.status) {
      error.status = 500
  }
  res.status(error.status).json({ status: error.status, message: "no se pudo cargar la pagina" })
})

app.listen(process.env.PORT || PORT, (err) => {
  err
    ? console.log("explotó todo 😫")
    : console.log(`Servidor corre en http://localhost:${PORT}`);
});
