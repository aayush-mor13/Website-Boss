import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const server = process.env.REACT_APP_SERVER;


function CompanyRegister() {
  const navigate = useNavigate();
  const { companyName } = useParams();

  const [companyId,setCompanyId] = useState('');

  const [color, setColor] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = {
    length: /.{8,}/,
    upper: /[A-Z]/,
    lower: /[a-z]/,
    digit: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
  };

   useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${companyName}`);
        setCompanyId(res.data._id);
      }
      catch (err) {
        console.error("Error fetching company:", err);
      }
    };

    fetchCompany();
  }, [companyName]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${companyName}`);
        setColor(res.data.primaryColor);
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    };
    fetchCompany();
  }, [companyName]);

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
      setError("Password must contain at least one uppercase letter !");
      setRegisterMsg('');
      return;
    }
    if (!passwordRegex.lower.test(password)) {
      setError("Password must contain at least one lowercase letter !");
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

    const user = { email : email, username : username, password : password ,companyId : companyId};

    try {
      await axios.post(`${server}`+'/api/auth/company-user/register', user);
      setRegisterMsg('Registered Successfully !');
      setEmail('');
      setUsername('');
      setPassword('');
      setError('');
      setTimeout(() => {
        navigate(`/cosmetics/${companyName}/login`);
      }, 1000);
    } catch (err) {
      setRegisterMsg('');
      if (
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message.includes("E11000")
      ) {
        setError("A user with this Username already exists !");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error Posting User Details");
      }
    }
  };

 

  return (
    <div className='w-dvw h-dvh flex justify-center items-center'>
      <form className='max-w-xl bg-neutral-100 p-16 py-16 flex flex-col items-center mx-auto rounded-3xl shadow-lg'>
        <h1 className='mb-16 font-bold text-6xl' style={{ color }}>Register</h1>

        <div className='flex flex-col gap-4'>
          <div>
            <input
              type="text"
              placeholder='Enter email'
              className='h-10 w-80 mb-6 p-4 rounded-lg focus:outline-none focus:ring-2'
              style={{ borderColor: color }}
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${color}`}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder='Enter username'
              className='h-10 w-80 mb-6 p-4 rounded-lg focus:outline-none focus:ring-2'
              style={{ borderColor: color }}
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${color}`}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative w-80 mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              className='h-10 w-full p-4 pr-10 rounded-lg focus:outline-none focus:ring-2'
              style={{ borderColor: color }}
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${color}`}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className='flex flex-col items-center justify-center mb-4'>
            {error && <div className='mt-4 font-bold text-red-500'>{error}</div>}
            {registerMsg && (
              <div className='mt-4 font-bold text-green-500 text-wrap text-center pl-4 pr-4'>
                {registerMsg}
              </div>
            )}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <button
              className='min-w-32 border-2 rounded-md p-2 pl-4 pr-4 text-white font-bold transition-colors'
              style={{
                backgroundColor: color,
                borderColor: color
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = color;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = color;
                e.target.style.color = 'white';
              }}
              onClick={handleSubmit}
            >
              Register
            </button>
            <span className='text-gray-700 text-xs m-4'>
              Already registered?{' '}
              <Link to={`/cosmetics/${companyName}/login`} className='hover:underline'>
                Click here to Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyRegister;