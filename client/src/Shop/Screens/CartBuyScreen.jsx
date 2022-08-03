import React from "react";
import Cart from "../Components/Cart";
import SearchAppBar from "../Components/NavBar";
import { StyledEngineProvider } from '@mui/material/styles';

const CartBuyScreen = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
      <SearchAppBar/>
      <Cart/>
    </StyledEngineProvider> 
  
    </>
  );
};

export default CartBuyScreen;