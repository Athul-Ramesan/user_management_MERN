import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupUserAction } from '../../store/redux'
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);

        }
    };
    // const handleImageChange = (e)=>{
    //     const image = e.target.value
    //     console.log(image)
    // }

    const handleUserSignup = (event) => {
        const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex = /^[^\s]{6,}$/
        event.preventDefault()
        try {
            if (!stringRegex.test(name.trim())) {
                setErrorMessage('Invalid Name')
                setShowError(true)
            } else if (!emailRegex.test(email.trim())) {
                setErrorMessage('Invalid email')
                setShowError(true)
            } else if (password !== confirmPassword) {
                setErrorMessage('Matching password error')
                setShowError(true)

            } else {
                dispatch(signupUserAction({ name, email, password },navigate,setErrorMessage))
            }
        } catch (err) {
            console.error(err);
            setShowError(true);
            setError('Something went wrong');
        }

    }
    useEffect(() => {
        // Check password match when confirmPassword or password changes
        setPasswordMatch(confirmPassword === password);
    }, [confirmPassword, password]);
    useEffect(() => {
        const timer = setTimeout(() => {
            showError && setShowError(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [showError])

    return (
        <div className='w-full flex flex-col justify-center bg-slate-200 items-center min-h-screen'>
            <h3 className='font-bold text-xl m-10 '>User Sign Up</h3>
            <form onSubmit={handleUserSignup} className='flex flex-col justify-center items-center w-2/5 bg-white relative border-[1px] border-black py-5'>
                <div className=' w-3/4 m-4 '>
                    <div className='flex  flex-col m-3 '>
                        <>
                            <label className='text-start' htmlFor="">Name</label>
                            <input name='name' type="text" onChange={handleChange} className='border-b border-slate-600 focus:outline-none bg-white' />
                        </>
                        <>
                            <label className='text-start' htmlFor="">Email</label>
                            <input name='email' type="text" onChange={handleChange} className='border-b border-slate-600 focus:outline-none bg-white' />
                        </>
                        <>
                            <label className='text-start pt-4' htmlFor="" >Password</label>
                            <input name='password' type="password" onChange={handleChange} className='border-b border-slate-600 bg-white focus:outline-none' />
                        </>

                        <>
                            <label className='text-start pt-4' htmlFor="" >Confirm Password</label>
                            <input name='confirmPassword' type="password" onChange={handleChange} className='border-b border-slate-600 bg-white focus:outline-none' />
                        </>
                        {passwordMatch && password && <p className='text-green-500'>Passwords match!</p>}
                        {!passwordMatch && confirmPassword && (<p className='text-red-500'>Password not match</p>)}

                      

                        {showError && <p className='text-red-500'role="alert" >{errorMessage}</p>}
                    </div>
                </div>
                <button className='border-[1px]  border-black bg-black text-white hover:bg-slate-200 hover:text-black transition duration-500 rounded  w-3/4 mt-10 mb-4'>Submit</button>
            </form>
        </div>
    )
}

export default SignUp
