import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

//Public;
import NotFound from "./Home/Screen/NotFound";
import HomeShopScreen from "./Home/Screen/HomeShopScreen";

import SingleProductScreen from "./Shop/Screens/SingleProductScreen";


import { HOME } from "./Config/Routes/paths";
import CartBuyScreen from "./Shop/Screens/CartBuyScreen";

function App() { 
  return (
    <>
  
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path={HOME} >
          {<Route index element={<HomeShopScreen/>} exact />}
          <Route path="/react/shop/:id" element={<SingleProductScreen/>} exact />
          {<Route path="*" element={<NotFound />} />}
          <Route path="/react/cart" element={<CartBuyScreen/>} exact />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
