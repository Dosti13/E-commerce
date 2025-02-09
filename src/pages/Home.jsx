import React, { useEffect } from 'react'
import image from '../assets/1.png'
import { ToastContainer, toast } from 'react-toastify';
import { addCart, getcart } from '../firebase/firebaseauth';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/authcontext';
function Home() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.item); 
const {user} = useAuth()


  useEffect(()=>{
    
    const  getdata =    async () => {

      if (user){
       await addCart(user.uid,cartItems)
       await getcart(user.uid,dispatch)
      }
    }
    getdata()
    },[])
  return (
    <>
    <div className=' absolute top-4 flex  '>
      <ToastContainer />
    </div>
    <div className="relative bg-gray-50 w-full">
      <div className="container mx-auto flex flex-col h-screen  md:flex-row items-center justify-between py-16 px-6 lg:px-20">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Upgrade Your Style <br />
            <span className="text-blue-500">Shop Now</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover the latest trends in fashion, electronics, and more. 
            Shop our exclusive collection and save big!
          </p>
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
              Shop Now
            </button>
            <button  className="ml-4 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-300 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-10 lg:mt-0  hidden  md:flex lg:w-1/2">
          <img
            src={image}
            alt="E-commerce Hero"
            className="w-full rounded-lg "
          />
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 opacity-10 pointer-events-none"></div>
    </div>
    </>
  );
}


export default Home