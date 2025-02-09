import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NavLink, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase/firebase";
import { cartClear,} from "../Store/slice";
import { doc, getDoc } from "firebase/firestore";
function Header() {
  const [open ,setopen ]= useState(false)
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart.item)
const dispatch = useDispatch()
  useEffect(()=>{
   const usbscribe =  onAuthStateChanged(auth,(User)=>{
          setUser(User)

    
    
        navigate('/')      
    })
    return ()=>usbscribe()
  },[dispatch,navigate])

   function logbtn(){
    try {
      
       signOut(auth)
      dispatch(cartClear())
    } catch (error) {
      console.log(error);
      
    }
  }
  return (

    <>
    <nav className=" flex justify-between items-center text-2xl bg-gray-800 text-gray-200 p-2 ">
        <div className="w-1/6">
            <h1>LOGO</h1>
        </div>
          <div className="text-gray-300 md:hidden"> 
              <button onClick={()=>setopen(!open)}>☰</button>
          </div>
          <div  className={`${
          open ? "block" : "hidden"
        } md:flex md:items-center md:justify-center md:space-x-6 md:flex-row  bg-gray-800 md:w-full w-full  absolute md:relative top-16 md:top-auto   z-10 p-4 md:p-0 shadow-md md:shadow-none`}>
        <div className="flex  md:justify-start  flex-col gap-1.5 text-xl md:flex-row  md:ml-auto md:mr-auto">
            <NavLink className={({isActive})=>isActive ? "text-gray-300 px-2 py-1 border-b-2  border-gray-200 ":"text-gray-100  shadow px-2 py-1 "}to="/">Home</NavLink>
            <NavLink className={({isActive})=> isActive ?"text-gray-300   px-2 py-1 border-b-2  border-gray-200 " :"text-gray-100  shadow px-2 py-1"} to="/About">About</NavLink>
            <NavLink  className={({isActive})=>isActive ? "text-gray-300  px-2 py-1 border-b-2  border-gray-200 ":"text-gray-100  shadow px-2 py-1"} to="/Contac">Contact</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-gray-300 px-2 py-1 border-b-2  border-gray-200 ":"text-gray-100 shadow px-2 py-1 "}to="/Product">Product</NavLink>
        
        </div>
        <div className="flex gap-2 text-xl md:flex-row flex-col  ">
            <NavLink className={({isActive})=>isActive ? "text-gray-200 shadow px-2 py-1 animate-pulse border-white ":"text-gray-300 shadow px-2 py-1"} to={"/Cart"}> <i className="fa fa-cart-shopping mr-1"></i>Cart <span className="text-green-400">{`${user && cart.length >0  ? `(${cart.length})` :""}`}  </span>  </NavLink>
            {user ? <>
            <button className="text-gray-300 shadow px-2 py-1" onClick={logbtn}>
              Logout
            </button>
            </> :
            <>
            <NavLink className={({isActive})=>isActive ? "text-gray-200 shadow px-2 py-1  border-white ":"text-gray-300 shadow px-2 py-1"} to={"/SIgnin"}><i className="fa fa-sign-in-alt mr-1"></i>Login</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-gray-200  shadow px-2 py-1 border-white ":"text-gray-300  shadow px-2 py-1"} to={"Signup"}><i className="fa fa-user-plus mr-1"></i> Register</NavLink></> }
        </div>
        </div>
    </nav>
    </>
  )
}

export default Header