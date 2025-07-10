import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyFooter from '../layout/CompanyFooter';
const server = process.env.REACT_APP_SERVER;


function CosmeticsOrdersPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">Loading company details...</p>
    </div>
  );
}


  return (
    <div className="min-h-screen flex flex-col">
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={color} />

      <div className="flex-grow p-6 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-center">My Orders</h2>

        {userData && (
          <p className="text-md text-gray-600 mb-4 text-center">
            Logged in as <strong>{userData.username}</strong> ({userData.email})
          </p>
        )}

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">You have no orders yet.</p>
        ) : (
          <div className="flex flex-col gap-8 mx-12">
            {orders.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-gray-700">
                    ₹ {item.price} x {item.qty}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Ordered on {new Date(item.addedAt).toLocaleDateString()} at {new Date(item.addedAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold">₹ {item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CompanyFooter name={companyData.name} logo={companyData.logo} color={color} />
    </div>
  );
}

export default CosmeticsOrdersPage;
