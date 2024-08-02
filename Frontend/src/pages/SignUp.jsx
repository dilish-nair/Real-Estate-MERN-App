import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-1'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5' >
        <div className='flex gap-4'>
        <input type="text" placeholder='First Name' className='border p-3 rounded-lg flex-grow' id="firstName" onChange={handleChange}/>
        <input type="text" placeholder='Last name' className='border p-3 rounded-lg flex-grow' id="lastName" onChange={handleChange}/>
        </div>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id="username" onChange={handleChange}/>
        <input type="email" placeholder='E-mail' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>
        <button className='bg-blue-500 p-3 text-white font-semibold text-xl rounded-lg hover:opacity-70 hover:text-black hover:border hover:border-black transition duration-300 ease-in-out hover:font-bold disabled:opacity-20'>SIGN UP</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-700 hover:font-semibold'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp