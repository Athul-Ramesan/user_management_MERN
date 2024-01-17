import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {loginAdminAction} from '../../store/redux'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleChange = (event)=>{
        const {name,value} = event.target
        if(name=="email"){
            setEmail(value)
        }else{
            setPassword(value)
        }
    }
    const handleAdminLogin = (event)=>{
        event.preventDefault()
        console.log(email,password,'email and password');
        dispatch(loginAdminAction({email,password},navigate))

    }
    return (
        <div className='w-full flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <h3 className='font-bold text-xl m-10 '>Admin Login</h3>
            <form onSubmit={handleAdminLogin} className='shadow-xl flex flex-col justify-center items-center w-2/5 bg-slate-300 relative border-[1px] border-white py-5'>
                <div className=' w-3/4 m-4 '>
                    <div className='flex  flex-col m-3 '>
                        <>
                            <label className='text-start' htmlFor="">Email</label>
                            <input type="text" name='email' onChange={handleChange} className='border-b border-slate-600 focus:outline-none bg-white' />
                        </>

                        <>
                            <label className='text-start  pt-4 ' htmlFor="" >Password</label>
                            <input type="password" name='password' onChange={handleChange}  className='border-b border-slate-600 bg-white focus:outline-none' />
                        </>
                    </div>
                </div>
                <button className='border-[1px]  border-white bg-white text-black hover:bg-black hover:text-white transition duration-500 rounded  w-3/4 mt-10 mb-4'>Submit</button>
            </form>
        </div>
    )
}

export default AdminLogin
