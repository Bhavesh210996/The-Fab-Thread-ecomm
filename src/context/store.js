import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productsReducer from "./ProductsSlice"
import cartsReducer from "./CartSlice"
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, cartsReducer);

const store = configureStore({
    reducer: {
        products: productsReducer,
        cartStates: persistedReducer
    }
})
const persistor = persistStore(store);

export {store, persistor};