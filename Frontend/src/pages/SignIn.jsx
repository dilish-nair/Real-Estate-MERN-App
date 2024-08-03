import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../Redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Response data:', data); // Debug log for response data

      if (res.ok && data.success) {
        // Optionally, store the token in local storage
        localStorage.setItem('token', data.token);

        dispatch(signInSuccess(data));
        navigate('/'); // Navigate to home page on successful login
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-1'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
        <input
          type="email"
          placeholder='E-mail'
          className='border p-3 rounded-lg'
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg'
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-blue-500 p-3 text-white font-semibold text-xl rounded-lg hover:opacity-70 hover:text-black hover:border hover:border-black transition duration-300 ease-in-out hover:font-bold disabled:opacity-20'
        >
          {loading ? "Loading..." : "SIGN IN"}
        </button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700 hover:font-semibold'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  );
}

export default SignIn;
