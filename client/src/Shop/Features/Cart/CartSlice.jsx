import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    item: []
    }
    

    const cartSlice = createSlice({
        name: "cart",
        initialState :  JSON.parse(window.localStorage.getItem("producto")) || initialState,
        reducers: {
            addtoCart(state, payload) {
                state.item.push(payload.payload),
                window.localStorage.setItem(`producto`, JSON.stringify( state ))
                Swal.fire({
                    icon: 'success',
                    text: 'Producto agregado al carrito',
                    confirmButtonText: 'Seguir agregando...'
                   
                    
                })
            
              
            },
            numItems(state){
                let index = 0;
                state.item.forEach(element => {
                        element.count = index++;
                });
                console.log(state)
            },
            delFromCart(state, payload){
                state.item.splice(payload.payload, 1);
                window.localStorage.setItem("producto", JSON.stringify(state));
                let index = 0;
                state.item.forEach(element => {
                        element.count = index++;
                });
    
            },
        }
    })
    
    export const { addtoCart, numItems, delFromCart } = cartSlice.actions; 
    
    
    export default cartSlice.reducer