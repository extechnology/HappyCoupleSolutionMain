import { configureStore } from "@reduxjs/toolkit";
import BuyReducer from '../Redux/BuySlice'



export const Store = configureStore({

    reducer:{


       BuyNow: BuyReducer


    }

})