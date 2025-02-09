import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart, cartClear, removequantity, setCartItems } from "../Store/slice";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartInput = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.item);

  // Sync cart with Firebase when user changes or cart updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Load cart from Firebase when user logs in
        const cartDoc = await getDoc(doc(db, "carts", currentUser.uid));
        if (cartDoc.exists()) {
          dispatch(setCartItems(cartDoc.data().items));
        }
      } else {
        setUser(null);
        // Clear cart when user logs out
        dispatch(cartClear());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Save cart to Firebase whenever it changes (if user is logged in)
  useEffect(() => {
    const saveCartToFirebase = async () => {
      if (user && cartItems.length >= 0) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cartItems }, { merge: true });
      }
    };

    if (user) {
      saveCartToFirebase();
    }
  }, [cartItems, user]);

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart(product));
    } else {
      alert("Please login to add items to cart");
    }
  };

  const handleRemoveFromCart = (productId) => {
    if (user) {
      dispatch(removeCart(productId));
    }
  };

  const handleUpdateQuantity = (product, increase) => {
    if (user) {
      if (increase) {
        dispatch(addToCart(product));
      } else {
        dispatch(removequantity(product));
      }
    }
  };

  const handleClearCart = () => {
    if (user) {
      dispatch(cartClear());
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0 && user) {
      navigate("/Buy");
    } else {
      alert("Your cart is empty or you need to login!");
    }
  };

  const totalAmount = cartItems.reduce((total, product) => {
    return total + (product.quantity || 1) * product.price;
  }, 0);

  // Rest of your JSX remains the same, but update the event handlers:
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* ... existing JSX ... */}
      <tbody>
        {cartItems.map((product) => (
          <tr key={product.id} className="text-sm sm:text-base">
            {/* ... other cells ... */}
            <td className="p-2 border text-center">
              <div className="flex items-center justify-center border rounded">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => handleUpdateQuantity(product, false)}
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
                  onClick={() => handleUpdateQuantity(product, true)}
                >
                  +
                </button>
              </div>
            </td>
            <td className="p-2 border text-center">
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default CartInput;