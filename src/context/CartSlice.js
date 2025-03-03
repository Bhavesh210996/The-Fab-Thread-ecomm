import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartCount: 0,
    selectedAddress: null,
    isSidebarOpen: false,
    isFilterBarOpen: false
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
        },
        toggleSidebar(state, action){
            state.isSidebarOpen = action.payload
        },
        toggleFilterSideBar(state, action){
            state.isFilterBarOpen = action.payload
        }
    }
})

export const {setCartCount, setSelectAddress, toggleSidebar, toggleFilterSideBar} = cartSlice.actions;
export default cartSlice.reducer;