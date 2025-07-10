import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCards from './ProductCards';
const server = process.env.REACT_APP_SERVER;


function HomeProducts() {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const slugify = name => name.toLowerCase().replace(/\s+/g, '-');
    const slug = slugify(companyName);

    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${server}/api/company/name/${slug}`);
        setCompanyData(res.data);
      } catch (err) {
        console.error('Error fetching company:', err);
        setErrorMsg('Failed to load company details.');
      }
    };

    fetchCompany();
  }, [companyName]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!companyData) return;

      try {
        const res = await axios.get(`${server}/api/product/company/${companyData._id}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setErrorMsg('Failed to load products.');
      }
    };

    fetchProducts();
  }, [companyData]);

  if (!companyData) return <div className="text-center mt-10 font-semibold">Loading...</div>;

  const color = companyData.primaryColor;

  return (
    <div id="companyProducts">
      <div className="py-10 min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color }}>
         Explore Products
        </h1>

        {errorMsg && (
          <div className="text-center text-red-500 font-semibold mb-6">{errorMsg}</div>
        )}

        <div className="flex flex-wrap gap-24 justify-center">
          {products.length > 0 ? (
            products.slice(0, 3).map((product, idx) => (
              <ProductCards
                key={idx}
                product={product}
                color={color}
                role="user"
                onDeleteSuccess={() => {}}
              />
            ))
          ) : (
            <div className="text-gray-700 text-center text-lg">No products found.</div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate(`/pharmacy/${companyName}/view-products`)}
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
            >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;
