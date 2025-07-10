import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const server = process.env.REACT_APP_SERVER;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please Enter all Details !');
      setLoginMsg('');
      return;
    }

    const user = {
      email,
      password
    };

    try {
      const response = await axios.post(`${server}`+'/api/auth/login', user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setLoginMsg('Logging In...');
      setEmail('');
      setPassword('');
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setLoginMsg('');
      if (err.response?.data?.message?.includes("E11000")) {
        setError("A user with this Username already exists !");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error Posting User Details");
      }
    }
  };

  return (
    <div className='w-dvw h-dvh flex justify-center items-center'>
      <form className='max-w-xl bg-neutral-100 p-16 py-16 flex flex-col items-center mx-auto rounded-3xl shadow-lg'>
        <h1 className='mb-6 text-amber-700 font-bold text-6xl'>Login</h1>
        <h3 className='mb-12 text-gray-700 text-lg font-bold'>Welcome back !</h3>
        <div className='flex flex-col gap-4'>
          <div>
            <input
              type="text"
              placeholder='Enter email'
              className='h-10 w-80 mb-6 p-4 rounded-lg border-gray-200 border-2 focus:outline-none focus:ring-2 focus:ring-amber-700'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="h-10 w-80 mb-6 p-4 pr-10 rounded-lg border-gray-200 border-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className='flex flex-col items-center justify-center mb-4'>
            {error && (
              <div className='mt-4 font-bold text-red-500'>{error}</div>
            )}
            {loginMsg && (
              <div className='mt-4 font-bold text-green-500 text-wrap text-center px-4'>
                {loginMsg}
              </div>
            )}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <button
              className='min-w-32 border-2 rounded-md p-2 px-4 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors'
              onClick={handleSubmit}
            >
              Login
            </button>
            {/*<span className='text-gray-700 text-xs m-4'>
              Not registered? <Link to='/register' className='hover:underline'>Click here to Register</Link>
            </span> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
