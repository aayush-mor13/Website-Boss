import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyFooter from '../layout/CompanyFooter';
const server = process.env.REACT_APP_SERVER;

function PharmacyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('companyToken');
    const storedUserId = localStorage.getItem('companyUserId');
    const storedCompanyId = localStorage.getItem('companyId');

    setToken(storedToken);
    setUserId(storedUserId);

    if (storedUserId && storedToken) {
      fetchOrders(storedUserId, storedToken);
      fetchUserData(storedUserId, storedToken);
    }

    if (storedCompanyId) {
      fetchCompanyData(storedCompanyId);
    }
  }, []);

  const fetchUserData = async (userId, token) => {
    try {
      const res = await axios.get(`${server}/api/auth/company-user/user/${userId}`, {
        headers: { 'company-token': token }
      });
      setUserData(res.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const fetchOrders = async (userId, token) => {
    try {
      const res = await axios.get(`${server}/api/order/${userId}`, {
        headers: { 'company-token': token }
      });

      const orderItems = res.data;
      const detailedOrders = [];

      for (let item of orderItems) {
        const productRes = await axios.get(`${server}/api/product/${item.productId}`, {
          headers: { 'company-token': token }
        });
        const product = productRes.data;

        detailedOrders.push({
          ...item,
          productName: product.name,
          price: product.price,
        });
      }

      setOrders(detailedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchCompanyData = async (companyId) => {
    try {
      const res = await axios.get(`${server}/api/company/${companyId}`);
      setCompanyData(res.data);
      setColor(res.data.primaryColor);
    } catch (err) {
      console.error('Error fetching company data:', err);
    }
  };

  if (!companyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading company details...</p>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={color} />

      <main className="flex-grow px-4 py-8 sm:px-10 lg:px-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">My Orders</h1>

        {userData && (
          <p className="text-center text-gray-600 mb-6">
            Logged in as <span className="font-medium">{userData.username}</span> ({userData.email})
          </p>
        )}

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <FaShoppingBag size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            {orders.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FaShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} x {item.qty}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Ordered on{' '}
                      <span className="font-medium text-gray-700">
                        {new Date(item.addedAt).toLocaleDateString()}
                      </span>{' '}
                      at{' '}
                      <span className="font-medium text-gray-700">
                        {new Date(item.addedAt).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹ {item.price * item.qty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CompanyFooter name={companyData.name} logo={companyData.logo} color={color} />
    </div>
  );
}
export default PharmacyOrdersPage;
