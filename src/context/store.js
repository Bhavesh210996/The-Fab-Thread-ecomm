import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice"
import cartsReducer from "./CartSlice"

const store = configureStore({
    reducer: {
        products: productsReducer,
        cartStates: cartsReducer
    }
})

export default store;