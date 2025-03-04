import { createSlice } from "@reduxjs/toolkit";



const initialState = {


    BuyDeatils:[]


}

const Buyslice = createSlice({


    name:"BuyNow",
    initialState:initialState,

    reducers:{


        AddBuyNow:(state,action)=>{

            state.BuyDeatils = action.payload
          
            

        }

    }

})

export const {AddBuyNow} = Buyslice.actions
export default Buyslice.reducer