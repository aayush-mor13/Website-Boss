import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyFooter from '../layout/CompanyFooter';
const server = process.env.REACT_APP_SERVER;


function AddProducts() {
  const { companyName } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    image: ''
  });
  const [companyData, setCompanyData] = useState(null);
  const [focusField, setFocusField] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const slugify = (name) => name.toLowerCase().replace(/\s+/g, '-');
    const slug = slugify(companyName);
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${slug}`);
        setCompanyData(res.data);
      } catch (err) {
        console.error('Error fetching company:', err);
      }
    };
    fetchCompany();
  }, [companyName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('companyToken');
    setError('');
    setSuccessMsg('');

    try {
      await axios.post(`${server}`+'/api/product', {
        ...product,
        companyId: companyData._id
      }, {
        headers: {
            'company-token': token
        }
      });
      setSuccessMsg('Product added successfully!');
      setProduct({ name: '', description: '', price: '', sku: '', image: '' });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add product.');
      }
    }
  };

  if (!companyData) return <div className='text-center mt-10 font-semibold'>Loading...</div>;

  const color = companyData.primaryColor;

  return (
    <div>
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={companyData.primaryColor} />

      <div className="w-full flex justify-center items-center py-20 px-4">
        <form
          className="max-w-xl bg-neutral-100 p-16 py-16 flex flex-col items-center mx-auto rounded-3xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-6 font-bold text-5xl" style={{ color }}>Add Product</h1>
          <h3 className="mb-12 text-gray-700 text-lg font-bold">Add your latest item below</h3>
          
          <div className="flex flex-col gap-4">
            {['name', 'description', 'price', 'sku', 'image'].map((field, i) => (
              <input
                key={i}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="h-10 w-80 mb-4 p-4 rounded-lg border-gray-200 border-2 outline-none transition-all duration-150"
                value={product[field]}
                onChange={e => setProduct({ ...product, [field]: e.target.value })}
                onFocus={() => setFocusField(field)}
                onBlur={() => setFocusField('')}
                style={focusField === field ? { boxShadow: `0 0 0 2px ${color}` } : {}}
                required
              />
            ))}

            <div className="flex flex-col items-center justify-center mb-4">
              {error && (
                <div className="mt-4 font-bold text-red-500 text-wrap text-center px-4">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="mt-4 font-bold text-green-500 text-wrap text-center px-4">
                  {successMsg}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="min-w-32 border-2 rounded-md p-2 px-4 font-bold transition-colors"
              style={{
                backgroundColor: color,
                borderColor: color,
                color: 'white'
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = color;
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = color;
                e.target.style.color = 'white';
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      <CompanyFooter name={companyData.name} logo={companyData.logo} color={companyData.primaryColor} />
    </div>
  );
}

export default AddProducts;