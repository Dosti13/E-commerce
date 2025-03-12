import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './component/Layout.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';
import Products from './pages/Products.jsx';
import BuyNow from './pages/Checkout.jsx';
import { AuthProvider } from './context/authcontext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'About', element: <About /> },
      { path: 'Contact', element: <Contact /> },
      { path: 'Product', element: <Product /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'Signin', element: <Signin /> },
      { path: 'Signup', element: <Signup /> },
      {path: 'Product/:id', element:<Products/>},
      {path:'Buy',   element:<BuyNow/>}
    ],
  },
]);
createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider> {/* ✅ Wrap inside AuthProvider */}
      <Provider store={store}> {/* ✅ Wrap inside Redux Provider */}
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>
)
