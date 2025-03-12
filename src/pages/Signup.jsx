import React, { useState } from "react";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth ,google} from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/firebaseauth";

const Signup = () => {
  const [email,setemail ] = useState("")
  const [password,setpassword ] = useState("")
  const [name ,setname] = useState("")
  const navigate = useNavigate()
  const handleSubmit=async (e)=>{
      e.preventDefault()
      try{
        //  await createUserWithEmailAndPassword(auth,email,password)
      await   registerUser(email,password,{name})
         alert("signup sucessfully")
         navigate("/")
      }
      catch(error){


      }
  }
  const handleGoogleSignUp =async ()=>{
    try {
      await signInWithPopup(auth,google)
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input type="text"
            value={name}
            onChange={(e)=>setname(e.target.value)}
             className="w-full border p-2 rounded-md" placeholder="Enter your name" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input onChange={(e)=>setemail(e.target.value)}
            value={email}
             type="email" className="w-full border p-2 rounded-md" 
             placeholder="Enter your email" />
          </div> 

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
             className="w-full border p-2 rounded-md" placeholder="Create a password" />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>

        </form>
          <button className=" cursor-pointer" onClick={handleGoogleSignUp} style={{ marginTop: "10px" }}>
                  Sign Up with Google
          </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/signin" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


