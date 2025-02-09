import { createSlice } from "@reduxjs/toolkit";


const loadcart = ()=>{
    const savedcart = localStorage.getItem("cart")
    return savedcart ? JSON.parse(savedcart) :[]
}




const initialState = {
    item: loadcart()
}

const  cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart: (state, action) => {
            state.item = action.payload; // Replace cart with new data
          },

        addToCart:(state,action)=>{
            
            const find = state.item.find((prod)=> prod.id == action.payload.id)       
        
            if (find){
                             find.quantity +=  1;
            }
            else{
                        state.item.push({ ...action.payload, quantity: 1 });
                    localStorage.setItem("cart",JSON.stringify(state.item))
            }        
               
        },
        removeCart:(state,action)=>{
             state.item=  state.item.filter((prod)=>prod.id !== action.payload)
              localStorage.setItem("cart", JSON.stringify(state.item)); 

        },
        cartClear:((state,action)=>{

            state.item=[]
            localStorage.removeItem("cart")
        }),
        removequantity:((state,action)=>{
            const find = state.item.find((prod)=> prod.id == action.payload.id)       
        
            if (find){
                if(find.quantity > 1){
                             find.quantity -=1 
                }
            }
            else{
                state.item = state.item.filter((prod) => prod.id !== action.payload.id);
                localStorage.setItem("cart",JSON.stringify(state.item))

            }  
        }),

    
    

    }
})
export default cartSlice.reducer
export const {addToCart,removeCart,cartClear,removequantity, setCart} = cartSlice.actions
