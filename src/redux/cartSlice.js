import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        currentCart: [],
        total: 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.currentCart.push(action.payload)
            state.total = state.total + parseFloat(action.payload.price);
        }, 
        removeFromCart : (state, action) => {
            // find the index of the removed item
            const index = state.currentCart.findIndex(
                (item) => item.id === action.payload
              );
              //copy the cart
              let newCart = [...state.currentCart];
              //remove the item
              if (index >= 0) {
                newCart.splice(index, 1);
              }
        
              //replace the existing cart with the new cart
              state.currentCart = newCart;
        },
        addTotal : (state, action) => {
            state.total = state.total + parseFloat(action.payload)
        },
        removeTotal : (state, action) => {
            state.total = state.total - parseFloat(action.payload)
        }
    }
});

export const {addToCart, removeFromCart, addTotal, removeTotal} = cartSlice.actions;

export default cartSlice.reducer;