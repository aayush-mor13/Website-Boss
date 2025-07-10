import React, { useEffect, useState } from 'react';
import {useNavigate,NavLink} from 'react-router-dom';
import axios from 'axios';

const server = process.env.REACT_APP_SERVER;


function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [domains, setDomains] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, domainRes] = await Promise.all([
          axios.get(`${server}`+'/api/company', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${server}`+'/api/domain')
        ]);
        setCompanies(companyRes.data);
        setDomains(domainRes.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="px-10 py-8">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">Welcome, Admin !</h1>

      <div className="flex flex-row justify-evenly items-center mx-24 mb-6">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
          <h2 className="max-w-44 min-h-16 text-lg font-semibold text-gray-700 text-center">Total Companies</h2>
          <p className="text-3xl font-bold text-amber-700 text-center mt-2">{companies.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
          <h2 className="max-w-44 min-h-16 text-lg font-semibold text-gray-700 text-center">Total Domain Templates</h2>
          <p className="text-3xl font-bold text-amber-700 text-center mt-2">{domains.length}</p>
        </div>
      </div>
      <div className='w-full flex justify-center my-12'>
        <button
          onClick={() => navigate('/register')}
          className="min-w-32 border-2 rounded-md p-2 pl-4 pr-4 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors"
        >
          Register More Admins
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-amber-700 mb-4 text-center">Company Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {companies.map(company => (
          <div key={company._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
            <p><strong>Domain:</strong> {company.domain}</p>
            <p><strong>Tagline:</strong> {company.tagline}</p>
            <p><strong>Founded:</strong> {company.about.year}</p>
            <button
              onClick={() => {
                const domain = company.domain.toLowerCase().replace(/\s+/g, '-');
                const name = company.name.toLowerCase().replace(/\s+/g, '-');
                navigate(`/${domain}/${name}`);
              }}
              className="min-w-32 border-2 rounded-md p-2 pl-4 pr-4 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors"
            >
              Go to Website
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
