import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS for default styles
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/slice";
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const notify = ()=>toast("add to cart sucessfully")
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-blue-500 mt-10">Product Detail</h1>
      <div className="absolute top-48">
      <ToastContainer position="top-center"  autoClose={1000}/> </div>
      <div className="flex flex-col md:flex-row items-center justify-center p-6 w-full min-h-screen">
        {loading ? (
          // Skeleton Loader
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-6">
            {/* Skeleton Image */}
            <div className="flex justify-center items-center bg-gray-100 p-4 md:w-1/2">
              <Skeleton height={250} width={250} />
            </div>

            {/* Skeleton Details */}
            <div className="p-6 flex flex-col gap-4 md:w-1/2">
              <Skeleton height={30} width="70%" />
              <Skeleton height={20} width="30%" />
              <Skeleton count={3} />
              <div className="flex gap-4 mt-4">
                <Skeleton height={40} width={100} />
                <Skeleton height={40} width={100} />
              </div>
            </div>
          </div>
        ) : (
          // Actual Product UI
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
            {/* Image Section */}
            <div className="flex justify-center items-center bg-gray-100 p-4 md:w-1/2">
              <img className="object-contain h-64 w-64" src={data.image} alt={data.title} />
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col gap-4 md:w-1/2">
              <h2 className="text-2xl font-semibold text-blue-400">{data.title}</h2>
              <p className="text-lg font-medium text-gray-700">
                Price: <span className="text-green-500">${data.price}</span>
              </p>
              <p className="text-sm text-gray-600">{data.description}</p>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button onClick={()=> {notify(); dispatch(addToCart(data))}}  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition duration-300">
                  Add to Cart
                </button>
                <button  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
