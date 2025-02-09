import { configureStore } from "@reduxjs/toolkit";
import cartRducer from './slice'
const store = configureStore({
    reducer:{
        cart: cartRducer
    }
}) 
export default store