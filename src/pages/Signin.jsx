import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../firebase/firebaseauth";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Using lucide-react for icons

const Signin = () => {
    const [email,setemail ] = useState("")
    const [password,setpassword ] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const naviagte = useNavigate()
    const handlesubmit =async(e)=>{
      e.preventDefault()
      try {
        // await  signInWithEmailAndPassword(auth,email,password)
        await signInUser(email,password)
      
      } catch (error) {
        console.log(error);
        
      }
      setpassword("")
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
        
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input 
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            type="email" className="w-full border p-2 rounded-md" placeholder="Enter your email" />
          </div>

          <div className="relative">
      <label className="block text-gray-700 font-medium">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full border p-2 pr-10 rounded-md"
          placeholder="Enter your password"
        />
        {/* Eye Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
    </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
