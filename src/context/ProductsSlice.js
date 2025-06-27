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
        setProductsList(state, action){
            state.productsList = action.payload;
            state.isProductsListLoading = false;
        },
        loader(state){
            state.isProductsListLoading = true;
        }
    }
})
export const {setProductsList, loader} = productsSlice.actions;
export const fetchProductsList = () =>{
    return async function(dispatch){
        dispatch(loader())
        const data = await getProductsList()
        dispatch(setProductsList(data))
    }
}

export default productsSlice.reducer;