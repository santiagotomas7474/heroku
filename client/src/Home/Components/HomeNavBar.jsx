import React from "react";
import { Button } from "@mui/material";
import { SvgIcon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomeNavBar.css"


function HomeNavBar() {

  return (
    <nav className="p-3">
    <div className="container">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        
        <li> <a href="/" className="title1 nav-link px-2"><Button className="rojo">Inicio</Button></a></li>
        <li>
        <Link className="title nav-link px-2" to={"/react"}><Button className="white">Productos</Button></Link>
        </li>
          <li><a href="/contact" className="title nav-link px-2"> <Button className="white"> Contactanos </Button>  </a></li>
          <li>
          <Link
            to={"/react/cart"}
               
          >
            <Button size="small">
              <SvgIcon className="blanco" variant="content">
                <ShoppingCartIcon />
              </SvgIcon>
          
            </Button>
          </Link></li>
        </ul>
        </div>
    </nav>
  )

}

export default HomeNavBar;

         