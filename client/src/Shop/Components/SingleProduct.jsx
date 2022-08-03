import React from 'react';
import axios from 'axios';

import  { useEffect, useState } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Fade } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../Features/Cart/CartSlice';

 function SingleProduct(){
  const itemID = window.location.pathname;
  const ID =  itemID.split("/").pop();
  const BASE = "http://localhost:3006/datos";
  const endpoint= `/${ID}`;
  const [datas, setDatas] = useState({});
  const dispatch = useDispatch();

  const [checked] = React.useState(true);

  useEffect(() => {
     fetch(BASE + endpoint, {
      method: "GET",
  })
    .then(res => res.json())
    .then(json => setDatas(json))
    }, [])

   return (

   <>
   <Fade 
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 900 } : {})}
            > 
   
   <Grid container spacing={1} justifyContent="center" sx={{p: {md:8, xs:1, sm:2}}}>
    
  <Grid item xs={4}>   
  <Card sx={{ height: '80%', display: 'flex', flexDirection: 'column', boxShadow: 3}}> 
  <CardMedia
         component="img"
         alt="producto"
         height="500"
         image={datas.image}/>
         </Card> 
  </Grid>
  <Grid item xs={8}>

  <Card sx={{ height: '80%', display: 'flex', flexDirection: 'column', boxShadow: 3}}>
  <Typography gutterBottom  component="div" sx={{m:{md:6, xs:1, sm:2}}}>
  <Grid container spacing={5}  direction="column" justifyContent="center" alignItems="flex-start">
  <Grid item xs={12}><Typography variant="h6">Marca del producto: {datas.mark}</Typography></Grid>
  <Grid item xs={12}><Typography variant="h6">Nombre del producto: {datas.name}</Typography></Grid>
  <Grid item xs={12}><Typography variant="h6">Descripción:      {datas.description}</Typography></Grid> 
  <Grid item xs={12}><Typography variant="h6">Precio: $ {datas.price}</Typography></Grid>
  <Grid item xs={12} sx={{mt:-5, ml:"50%"}}><Button onClick={() => dispatch(addtoCart(datas))} variant="contained" color='success'>Agregar al carrito</Button></Grid>
   
  </Grid>
  </Typography>
    </Card>
    </Grid>
</Grid>
</Fade >
   </>
   )
}

export default SingleProduct;