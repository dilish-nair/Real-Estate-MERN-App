import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLoading(false);
        setError(null);
        navigate('/sign-in');
      } else {
        setLoading(false);
        setError(data.message || 'Sign-up failed');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-1'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5' >
        <div className='flex gap-4'>
          <input type="text" placeholder='First Name' className='border p-3 rounded-lg flex-grow' id="firstName" onChange={handleChange} />
          <input type="text" placeholder='Last name' className='border p-3 rounded-lg flex-grow' id="lastName" onChange={handleChange} />
        </div>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id="username" onChange={handleChange} />
        <input type="email" placeholder='E-mail' className='border p-3 rounded-lg' id="email" onChange={handleChange} />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id="password" onChange={handleChange} />
        <button disabled={loading} className='bg-blue-500 p-3 text-white font-semibold text-xl rounded-lg hover:opacity-70 hover:text-black hover:border hover:border-black transition duration-300 ease-in-out hover:font-bold disabled:opacity-20'>
          {loading ? "Loading..." : "SIGN UP"}
        </button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700 hover:font-semibold'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
}

export default SignUp;
