import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addToCart,removeCart ,cartClear,removequantity} from "../Store/slice";
import {  useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addCart, deleteSubcollection, getcart, removeCartItem } from "../firebase/firebaseauth";

const CartInput = () => {
  const [user ,setUser]=  useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.item); 
  
  
  
    useEffect(()=>{
     const usbscribe =  onAuthStateChanged(auth,async (User)=>{

      if (User){
        setUser(User)
       await addCart(User.uid,cartItems)
       await getcart(User.uid,dispatch)
      }
      else{
        setUser(null)
      }
      })
      return ()=>usbscribe()
    },[])
  const handleCheckout = () => {
    if (cartItems.length > 0 && user) {
      navigate("/Buy"); // Navigate to checkout page
    } else {
      alert("Your cart is empty! or you have to login ");
    }
  };

  const totalAmount = cartItems.reduce((total, product) => {
    return total + (product.quantity || 1) * product.price;
  }, 0);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="w-full max-w-4xl bg-white p-4 shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base">
                <th className="p-2 border">Cart Items</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Quantity</th>
                <th  className="p-2 border">Subtotal</th>
                <th  className="p-2 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {user && cartItems.map((product) => (
                <tr key={product.id} className="text-sm sm:text-base">
                  <td className="p-2 border flex items-center space-x-4">
                    <img src={product.image} alt="Product" className="w-12 h-12" />
                    <span className="whitespace-nowrap">{product.title}</span>
                  </td>
                  <td className="p-2 border text-center">${product.price}</td>
                  <td className="p-2 border text-center">
                    <div className="flex items-center justify-center border rounded">
                      <button
                        className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                       onClick={() => dispatch(removequantity(product))}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={product.quantity || 1}
                        className="w-12 text-center border-x"
                        readOnly
                      />
                      <button
                        className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2 border text-center">
                    ${(product.quantity || 1) * product.price}
                  </td>
                  <td className="p-2 border text-center">
                  <button className="text-red-500 hover:text-red-700 " onClick={()=>{removeCartItem(user.uid,product.id);dispatch(removeCart(product.id))}}>remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Card */}
      <div className="w-full max-w-4xl gap-4 bg-white p-4 shadow-md rounded-lg mt-4 text-center">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <p className="text-xl font-semibold  ">Total Amount: <span className="font-bold text-green-300">$ {totalAmount.toFixed()}</span></p>
        <button
          onClick={handleCheckout}
          className={`mt-3 px-6 mx-2 py-2 font-semibold rounded-lg ${
            cartItems.length > 0 ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
        <button  onClick={()=>{deleteSubcollection(user.uid);dispatch(cartClear())}} className="mt-3 px-6 py-2  bg-red-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          ClearCart
        </button>
      </div>
    </div>
  );

};

export default CartInput;
