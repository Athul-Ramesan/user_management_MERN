import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SERVER_BASE_URL } from '../Constants/url'
import { logoutUserAction } from '../store/redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated)
    const location = useLocation()
    const handleLogout = ()=>{
      dispatch(logoutUserAction(navigate))
    }
  return (
    <div className='flex bg-white fixed h-14 justify-between items-center w-full py-4 border-b-[1px] shadow-md '>
      <Link to={'/home'} className='cursor-pointer font-bold text-black px-4'>Store</Link>
      {
      isAuthenticated ? 
       (<div className='flex  gap-3'>
        <Link to={'/profile'} className=' font-bold text-black m-3'>profile</Link>
        <p onClick={handleLogout} className='cursor-pointer font-bold text-black px-3 m-3 border-black border-[1px] rounded hover:bg-black hover:text-white transition duration-500'>Logout</p>
      </div>) : 
        ( (location.pathname === '/sign-up') ? (<Link className='font-bold text-black px-4  m-3 border-black border-[1px] rounded hover:bg-black hover:text-white transition duration-500' to={'/login'}>Login</Link>)
         :
      (<Link className='font-bold text-black px-4  m-3 border-black border-[1px] rounded hover:bg-black hover:text-white transition duration-500' to={'/sign-up'}>Sign-Up</Link>)
      )}
      
      
    </div>
  )
}

export default Navbar
