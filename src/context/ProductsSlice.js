import { createSlice } from "@reduxjs/toolkit"
import { getProductsList } from "../services/apiMenProducts"

const initialState = {
    productsList: [],
    isProductsListLoading: false,
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsLoading(state, action){
            state.productsList = action.payload;
            state.isProductsListLoading = false;
        },
        loader(state){
            state.isProductsListLoading = true;
        }
    }
})

export const productsLoading = (filter) =>{
    return async function(dispatch){
        dispatch({type: "products/loader"})
        const data = await getProductsList(filter)
        dispatch({type: "products/productsLoading", payload: data})
    }
}

export default productsSlice.reducer;