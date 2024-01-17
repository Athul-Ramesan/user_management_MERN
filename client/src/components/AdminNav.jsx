import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAdminAction } from '../store/redux'
const AdminNav = () => {
    const isAuthenticated = useSelector((state)=>state.admin.isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout =()=>{
        dispatch(logoutAdminAction(navigate))
    }
  return ( 
        <div className='flex bg-white fixed h-14 justify-between items-center w-full py-4 border-b-[1px] shadow-md '>
            {isAuthenticated && 
            <>
      <h2  className='cursor-pointer font-bold text-black px-4'>Dashboard</h2>
      <div className='flex  gap-3'>
        <p onClick={handleLogout} className='cursor-pointer font-bold text-black px-3 m-3 border-black border-[1px] rounded hover:bg-black hover:text-white transition duration-500'>Logout</p>
      </div>
            </>
    }
    </div>
  )
}

export default AdminNav
