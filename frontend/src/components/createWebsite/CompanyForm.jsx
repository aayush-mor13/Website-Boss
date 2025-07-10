import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
const server = process.env.REACT_APP_SERVER;


function CompanyForm({ selectedDomain }) {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    tagline: '',
    email: '',
    phone: '',
    address: '',
    primaryColor: '',
    what: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [submitMsg,setSubmitMsg] = useState('');
  
  const colorOptions = [
    { name: 'Blue', value: '#007BFF' },
  { name: 'Green', value: '#28A745' },
  { name: 'Red', value: '#DC3545' },
  { name: 'Purple', value: '#6F42C1' },
  { name: 'Teal', value: '#20C997' },
  { name: 'Rose', value: '#FF6B81' },
  { name: 'Indigo', value: '#6610f2' },
  { name: 'Navy', value: '#001F3F' },
  { name: 'Olive', value: '#3D9970' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Sky Blue', value: '#87CEEB' },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg('');
    try{
        const selectedColorHex = formData.primaryColor;
        const newCompany = {
          ...formData,
          primaryColor: selectedColorHex,
          domain: selectedDomain
        };
        await axios.post(`${server}`+'/api/company',newCompany,{
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
    console.log('Submitted:', formData);
    setError('');
    setSubmitMsg('Company details Succesfully Added !');
    setFormData({
        name: '',
        logo: '',
        tagline: '',
        email: '',
        phone: '',
        address: '',
        primaryColor: '',
        what: '',
        year: ''
    });
    setTimeout(()=>{
        navigate('/create-website/add-product', { state: { name: formData.name, domain: selectedDomain, tagline: formData.tagline, year:formData.year } });
    },1000);
    }
    catch(err){
        if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message);
        setSubmitMsg('');
      }
      else{
        setError("Error Posting Company Details");
        console.error(err);
        setSubmitMsg('');
      }

    }
  }

  return (
    <div className="mx-40 my-20">
      <h2 className="text-3xl font-bold mb-8 text-amber-700">Enter Company Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Company Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Logo URL</label>
          <input type="text" name="logo" value={formData.logo} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Tagline</label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Year Founded</label>
          <input type="number" name="year" value={formData.year} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div>
            <label className="block font-medium mb-1">Primary Color Theme</label>
            <select
            name="primaryColor"
            value={formData.primaryColor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
            >
            <option value="">Select a color theme</option>
            {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                    {color.name}
                </option>
            ))}
            </select>
        </div>
        {formData.primaryColor ? (
            <div className="w-full mt-2 pt-4 flex items-center gap-2 self-center">
                <span className="text-sm">Selected Color:</span>
                <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: formData.primaryColor }}
                ></div>
            </div>
        ) : <div></div>}

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input type="string" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" required />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">What is {formData.name || 'your company'}?</label>
          <textarea name="what" value={formData.what} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white" rows="4" required></textarea>
        </div>

        <div className="md:col-span-2 text-center">
            {error.length>0 && (
                <div className='mt-4 mb-4 font-bold text-red-500'>
                    {error}
                </div>
            )}
          <button type="submit"
            className="border-2 rounded-md p-2 pl-6 pr-6 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors">
            Submit
          </button>
          {submitMsg.length>0 &&(
            <div className='mt-4 mb-4 font-bold text-green-500 text-wrap text-center pl-4 pr-4'>
                {submitMsg}
            </div>
            )}
        </div>
      </form>
    </div>
  )
}

export default CompanyForm
