import { createSlice } from "@reduxjs/toolkit"
import { getCurrentUser } from "../services/apiAuth"

const initialState = {
    cartCount: 0,
    selectedAddress: null,
    isSidebarOpen: false,
    isFilterBarOpen: false,
    user: {},
    isAuthenticated: false,
    isUserLoading: false
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
        },
        getUser(state, action){
            state.user = action.payload
            state.isAuthenticated = action.payload?.role === "authenticated"
            state.isUserLoading = false
        },
        loader(state){
            state.isUserLoading = true
        }
    }
})
export const { setCartCount, setSelectAddress, toggleSidebar, toggleFilterSideBar, getUser: setUser, loader } = cartSlice.actions;

export const getUser = () => {
    return async function(dispatch){
        dispatch(loader())
        const userData = await getCurrentUser();
        dispatch(setUser(userData))
    }
}

export default cartSlice.reducer;