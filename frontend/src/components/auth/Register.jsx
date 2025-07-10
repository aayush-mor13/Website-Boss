import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const server = process.env.REACT_APP_SERVER;

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = {
    length: /.{8,}/,
    upper: /[A-Z]/,
    lower: /[a-z]/,
    digit: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim()) {
      setError('Please Enter all Details !');
      setRegisterMsg('');
      return;
    }
    if (email.length > 0 && !regex.test(email)) {
      setError("Please Enter correct Email");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.length.test(password)) {
      setError("Password must be at least 8 characters long !");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.upper.test(password)) {
      setError("Password must contain at least one Uppercase letter !");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.lower.test(password)) {
      setError("Password must contain at least one Lowercase letter !");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.digit.test(password)) {
      setError("Password must contain at least one digit !");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.special.test(password)) {
      setError("Password must contain at least one special character !");
      setRegisterMsg('');
      return;
    }

    const user = { email, username, password };
    try {
      await axios.post(`${server}`+'/api/auth/register', user);
      setRegisterMsg('Registered Successfully !');
      setEmail('');
      setUsername('');
      setPassword('');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setRegisterMsg('');
      if (
        err.response?.data?.message &&
        err.response.data.message.includes("E11000")
      ) {
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
        <h1 className='mb-16 text-amber-700 font-bold text-6xl'>Register</h1>
        <div className='flex flex-col gap-4'>
          <div>
            <input
              type="text"
              placeholder='Enter email'
              className='h-10 w-80 mb-6 p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-700'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder='Enter username'
              className='h-10 w-80 mb-6 p-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-700'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter password'
              className='h-10 w-80 mb-6 p-4 pr-10 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-700'
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
              <div className='mt-4 font-bold text-red-500'>
                {error}
              </div>
            )}
            {registerMsg && (
              <div className='mt-4 font-bold text-green-500 text-wrap text-center px-4'>
                {registerMsg}
              </div>
            )}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <button
              className='min-w-32 border-2 rounded-md p-2 px-4 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors'
              onClick={handleSubmit}
            >
              Register
            </button>
            <span className='text-gray-700 text-xs m-4'>
              Already registered? <Link to='/login' className='hover:underline'>Click here to Login</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
