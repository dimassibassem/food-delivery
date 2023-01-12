import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        items: []
    },
    reducers: {
        //add to favorites
        addToFavorites : (state, action) => {
            if (!state.items.find((elem) => elem.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        //remove from favorites
        removeFromFavorites : (state, action) => {
            // find the index of the removed item
            const index = state.items.findIndex(
                (item) => item.id === action.payload
              );
              //copy the cart
              let newFavs = [...state.items];
              //remove the item
              if (index >= 0) {
                newFavs.splice(index, 1);
              }

              //replace the existing cart with the new cart
              state.items = newFavs;
        }
    }
});

export const {addToFavorites, removeFromFavorites} = favoriteSlice.actions;

export default favoriteSlice.reducer;
