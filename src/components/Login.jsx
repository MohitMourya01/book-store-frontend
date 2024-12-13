import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [message, setMessage] =useState("")
    const {loginUser, signInWithGoogle} =  useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()
    const onSubmit = async (data) => {
         console.log(data)
         try{
            await loginUser(data.email, data.password)
            //alert("Login Successful!")
            navigate("/")
         }catch(error){
             console.error(error)
             setMessage("Please enter valid Username or Password!")
         }
    }
    const handleGoogleSignIn = async () => {
        try{
            await signInWithGoogle()
            navigate("/")
        }catch(error){
            console.error(error)
        }
    }
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                     {...register("email",{required: true})}
                     type="email" name='email' id='email' className='shadow bg-gray-100 rounded appearance-none focus:outline-none  w-full py-2 px-3 leading-tight focus:shadow ' placeholder='Enter Email'/>
                </div>
                <div className='my-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", {required:true})}
                    type="password" name='password' id='password' className='shadow bg-gray-100 rounded appearance-none focus:outline-none w-full py-2 px-3 leading-tight focus:shadow ' placeholder='Enter Password'/>
                </div>
                {message && <p className=' text-red-500 text-xs italic mb-3'>{message}</p>}
                <div>
                    
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'> Login </button>
                    </div>
                    </form>
                    <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to='/register' className='text-blue-500 hover:text-blue-700'>Register</Link></p>

                    {/* google sign in */}
                    <div className='mt-4'>
                        <button 
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 justify-center items-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                        <FcGoogle className='mr-2 size-6'/>
                        Sign in with Google
                        </button>
                    </div>
                    <p className='mt-5 text-center text-gray-500 text-xs '>©2025 Book Store. All rights reserved.</p>
                
           
        </div>
    </div>
  )
}

export default Login
