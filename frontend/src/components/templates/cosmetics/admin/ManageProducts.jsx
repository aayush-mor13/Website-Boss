import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyFooter from '../layout/CompanyFooter';
import ProductCards from '../home/ProductCards';
const server = process.env.REACT_APP_SERVER;


function ManageProducts() {
  const { companyName } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const slugify = name => name.toLowerCase().replace(/\s+/g, '-');
    const slug = slugify(companyName);

    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${slug}`);
        setCompanyData(res.data);
      } catch (err) {
        console.error('Error fetching company:', err);
        setError('Failed to load company details.');
      }
    };

    fetchCompany();
  }, [companyName]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!companyData) return;
      const token = localStorage.getItem('companyToken');
      try {
        const res = await axios.get(`${server}/api/product/company/${companyData._id}`, {
          headers: {
            'Company-token': token
          }
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      }
    };

    fetchProducts();
  }, [companyData]);

  if (!companyData) return <div className="text-center mt-10 font-semibold">Loading...</div>;

  const color = companyData.primaryColor;

  return (
    <div>
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={color} />

      <div className="py-10 bg-gray-50 min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color }}>Manage Products</h1>

        {error && (
          <div className="text-center text-red-500 font-semibold mb-6">{error}</div>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <ProductCards
                key={idx}
                product={product}
                onDeleteSuccess={() => {
                    const fetchProducts = async () => {
                    try {
                        const token = localStorage.getItem('companyToken');
                        const res = await axios.get(`${server}/api/product/company/${companyData._id}`, {
                        headers: { 'Company-token': token }
                    });
                    setProducts(res.data);
                    }
                    catch (err) {
                        console.error('Error fetching products:', err);
                        setError('Failed to reload products.');
                    }
                };
                fetchProducts();
                }}
            />
            ))
          ) : (
            <div className="text-gray-700 text-center text-lg">No products available.</div>
          )}
        </div>
      </div>

      <CompanyFooter name={companyData.name} logo={companyData.logo} color={color} />
    </div>
  );
}

export default ManageProducts;