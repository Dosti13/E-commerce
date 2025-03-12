import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartClear } from "../Store/slice";
import {deleteSubcollection } from "../firebase/firebaseauth";
import { useAuth } from "../context/authcontext";
const BuyNow = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.item);

  const {user} = useAuth()
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure cart is not empty
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }
        
      const formattedProducts = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1, // Ensure quantity is present
      }));
  
      const orderData = {
        ...formData,
        products: formattedProducts, // Store all products in the order
        createdAt: new Date(),
      };

      await addDoc(collection(db, "orders"), orderData);
      alert("Order placed successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      });
      deleteSubcollection(user.uid)
      dispatch(cartClear(cartItems))
      navigate('/product')

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

    const totalAmount = cartItems.reduce((total, product) => {
      return total + (product.quantity || 1) * product.price;
    }, 0);
  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Buy Now</h2>

      {/* Product Details */}
      <div className="mb-4 p-4 bg-white rounded-md shadow">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="border-b py-2">
              <p className="text-lg">{item.title}</p>
              <p className="text-gray-600">Price: ${item.price * item.quantity}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          ))
          
        ) : (
          <p className="text-gray-500">No items in cart</p>
        )}
        <p className="text-gray-600">TotalPrice : {totalAmount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md h-24"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default BuyNow;