import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyAbout from './CompanyAbout';
import CompanyContact from './CompanyContact';
import CompanyFooter from '../layout/CompanyFooter';
import bgimg from '../../../../assets/pharmacybg.webp';
import HomeProducts from './HomeProducts';
const server = process.env.REACT_APP_SERVER;


function CompanyHome() {
  const { companyName } = useParams();
  const [companyId, setCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${companyName}`);
        setCompanyData(res.data);
        setCompanyId(res.data._id);
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyName]);

  if (loading) return <div>Loading...</div>;
  if (!companyId) return <div>Company not found</div>;

  return (
    <div>
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={companyData.primaryColor}/>
      <div
        className="m-2 h-[calc(100vh-82px)] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg})` }}
      >          
          <div className='bg-white/40 backdrop-blur-0 w-full h-full'>
            <div className='h-full flex flex-col items-center justify-center gap-20'>
              <div className='flex flex-col gap-4 items-center'>
                <p className='text-8xl font-bold'>{companyData.name}</p>
                <p className='mt-6 text-4xl font-bold  text-center'>" {companyData.tagline} "</p>
              </div>
            </div>
          </div>
      </div>
      <HomeProducts/>
      <CompanyAbout companyData={companyData}/>
       <CompanyContact companyData={companyData}/>
    <CompanyFooter name={companyData.name} logo={companyData.logo} color={companyData.primaryColor}/>
    </div>
  );
}

export default CompanyHome;
