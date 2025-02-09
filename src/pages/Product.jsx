import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../Store/slice";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles
import { ToastContainer, toast } from 'react-toastify';

export default function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = ()=>toast("add to cart sucessfully")

   
   
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-center"  autoClose={1000}/> 
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {loading
          ? // Skeleton Loader while fetching data
            Array.from({ length: 8 }).map((_, index) => (
              <div
              key={index}
              className="border rounded-lg p-4 shadow-lg bg-white flex flex-col justify-between animate-pulse"
              >
                <Skeleton height={160} className="w-full" />
                <Skeleton height={20} width="80%" className="mt-2" />
                <Skeleton height={20} width="40%" />
                <div className="mt-4 flex justify-center gap-2">
                  <Skeleton height={30} width={80} />
                  <Skeleton height={30} width={80} />
                </div>
              </div>
            ))
          : // Actual Product List
            data.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg border-none p-4 shadow-xl bg-white transition-transform transform hover:scale-105 flex flex-col justify-between"
              >
                <div>
                  <Link to={`${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-contain"
                    />
                  </Link>
                  <h2 className="mt-2 text-lg font-bold">{product.title}</h2>
              <hr />
                  <p className="text-blue-600 font-bold ">${product.price}</p>
                  <hr />
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() =>  {notify();dispatch(addToCart(product))}}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-700 transition-all shadow-md"
                  >
                    🛒 Add to Cart
                  </button>

                  <button onClick={() =>{navigate('/Cart');  dispatch(addToCart(product))}} className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-700 transition-all shadow-md">
                    💳 Buy Now
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
