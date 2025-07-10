import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;


function CompanyLogin() {
  const { companyName } = useParams();
  const [color, setColor] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log("companyId:", companyId);

        const res = await axios.get(`${server}/api/company/name/${companyName}`);
        setCompanyId(res.data._id);
        localStorage.setItem('companyId', res.data._id);
        setColor(res.data.primaryColor);
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    };
    fetchCompany();
  }, [companyName]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!companyId) {
    setError("Company info not loaded yet. Please wait a moment.");
    return;
  }

  if (!email.trim() || !password.trim()) {
    setError('Please Enter all Details !');
    setLoginMsg('');
    return;
  }

  const user = { email, password, companyId };

  try {
    const response = await axios.post(`${server}`+'/api/auth/company-user/login', user);
    localStorage.setItem('companyToken', response.data.token);
    localStorage.setItem('companyUserRole', response.data.companyUserRole);
    localStorage.setItem("companyUserId", response.data.userId);
    setLoginMsg('Logging In...');
    setEmail('');
    setPassword('');
    setError('');
    setTimeout(() => {
      navigate(`/pharmacy/${companyName}`);
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
        <h1 className='mb-6 font-bold text-6xl' style={{ color }}>Login</h1>
        <h3 className='mb-12 text-gray-700 text-lg font-bold'>Welcome back !</h3>
        <div className='flex flex-col gap-4'>
          <div>
            <input
              type="text"
              placeholder='Enter email'
              className='h-10 w-80 mb-6 p-4 rounded-lg border-gray-200 border-2 outline-none transition-all duration-150'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              style={emailFocus ? { boxShadow: `0 0 0 2px ${color}` } : {}}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              className='h-10 w-80 mb-6 p-4 pr-10 rounded-lg border-gray-200 border-2 outline-none transition-all duration-150'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              style={passwordFocus ? { boxShadow: `0 0 0 2px ${color}` } : {}}
            />
            <button
              type="button"
              className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(prev => !prev)}
            >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className='flex flex-col items-center justify-center mb-4 '>
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
              className='min-w-32 border-2 rounded-md p-2 px-4 font-bold transition-colors'
              style={{
                backgroundColor: color,
                borderColor: color,
                color: 'white'
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
              Login
            </button>
            <span className='text-gray-700 text-xs m-4'>
              Not registered? <Link to={`/pharmacy/${companyName}/register`} className='hover:underline'>Click here to Register</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyLogin;
