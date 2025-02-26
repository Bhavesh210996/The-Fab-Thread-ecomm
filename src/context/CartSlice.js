import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartCount: 0,
    selectedAddress: null,
}

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setCartCount(state, action){
            state.cartCount = action.payload
        },
        setSelectAddress(state, action){
            state.selectedAddress = action.payload
        }
    }
})

export const {setCartCount, setSelectAddress} = cartSlice.actions;
export default cartSlice.reducer;