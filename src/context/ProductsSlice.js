import { createSlice } from "@reduxjs/toolkit"
import { getProductsList } from "../services/apiMenProducts"

const initialState = {
    productsList: [],
    isProductsListLoading: false,
    filterSearchQuery: ""
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
        },
        setFilterSearchQuery(state, action){
            state.filterSearchQuery = action.payload;
        }
    }
})
export const {setProductsList, loader, setFilterSearchQuery} = productsSlice.actions;
export const fetchProductsList = () =>{
    return async function(dispatch){
        dispatch(loader())
        const data = await getProductsList()
        dispatch(setProductsList(data))
    }
}

export default productsSlice.reducer;