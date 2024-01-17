import React from 'react'

const SignUp = ({handleUserSignup,handleChange,passwordMatch,password,confirmPassword}) => {
    
  return (
    <>
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
    </>
  )
}

export default SignUp
