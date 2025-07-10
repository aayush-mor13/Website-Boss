import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CompanyNavbar from '../layout/CompanyNavbar';
import CompanyFooter from '../layout/CompanyFooter';
const server = process.env.REACT_APP_SERVER;


function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [color, setColor] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');
  const storedCompanyId = localStorage.getItem('companyId');

  function slugifyName(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('companyToken');
    const storedUserId = localStorage.getItem('companyUserId');
    setToken(storedToken);
    setUserId(storedUserId);
    
    if (storedUserId && storedToken) {
      fetchCartWithProductDetails(storedUserId, storedToken);
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

  const fetchCartWithProductDetails = async (userId, token) => {
    try {
      const res = await axios.get(`${server}/api/cart/${userId}`, {
        headers: { 'company-token': token },
      });

      const cartData = res.data;
      const detailedCart = [];

      for (let item of cartData) {
        const productRes = await axios.get(`${server}/api/product/${item.productId}`, {
          headers: {
            'company-token': token
          }
        });
        const product = productRes.data;

        detailedCart.push({
          ...item,
          productName: product.name,
          price: product.price,
        });
      }

      setCartItems(detailedCart);

      if (detailedCart.length > 0) {
        fetchCompanyData(detailedCart[0].companyId);
      }

      const total = detailedCart.reduce((sum, item) => sum + item.price * item.qty, 0);
      setTotalPrice(total);
    } catch (err) {
      console.error('Error fetching cart or product details:', err);
    }
  };

  const fetchCompanyData = async (companyId) => {
    try {
      const res = await axios.get(`${server}/api/company/${companyId}`);
      setCompanyData(res.data);
      console.log(res.data);
      setColor(res.data.primaryColor);
    } catch (err) {
      console.error('Error fetching company data:', err);
    }
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;

  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: totalPrice * 100,
      currency: "INR",
      name: companyData?.name || "Company",
      description: "Test Transaction",
      image: companyData?.logo || "logo",
      handler: async function (response) {
          setPaymentSuccessMsg(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          console.log(response);
          try {
            await axios.post(`${server}/api/cart/move-from-cart/${userId}`, {}, {
              headers: { 'company-token': token }
            });
            setPaymentSuccess(true);
            fetchCartWithProductDetails(userId, token);
            setTimeout(() => {
              setPaymentSuccess(false);
              navigate(`/pharmacy/${slugifyName(companyData.name)}/my-orders`);
            }, 3000);
          }
          catch(err){
            console.error('Failed to move cart to orders:', err);
          }
      },
      prefill: {
        name: userData?.username || "",
        email: userData?.email || "",
        contact: "9999999999",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: color,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  if (!companyData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CompanyNavbar name={companyData.name} logo={companyData.logo} color={color} />
      <div className="flex-grow bg-gray-50 py-10 px-6 md:px-20">
  <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800">Your Shopping Cart</h2>

  {userData && (
    <p className="text-md text-gray-600 text-center mb-6">
      Logged in as <strong>{userData.username}</strong> ({userData.email})
    </p>
  )}

  {paymentSuccess && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
      {paymentSuccessMsg}
    </div>
  )}

  {cartItems.length === 0 ? (
    <p className="text-xl text-red-500 font-bold text-center mt-20">Your cart is empty.</p>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 flex flex-col gap-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                IMG
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.productName}</h3>
                <p className="text-gray-600 text-sm">₹ {item.price} × {item.qty}</p>
              </div>
            </div>
            <div className="text-right font-semibold text-gray-900 text-lg">
              ₹ {item.price * item.qty}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md sticky top-28 h-fit">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Items:</span>
          <span className="text-gray-800 font-medium">₹ {totalPrice}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Delivery:</span>
          <span className="text-gray-800 font-medium">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
          <span>Total:</span>
          <span>₹ {totalPrice}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-md font-bold text-white transition-all"
          style={{
            backgroundColor: color,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = color;
            e.target.style.border = `2px solid ${color}`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = color;
            e.target.style.color = 'white';
            e.target.style.border = `2px solid transparent`;
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  )}
</div>
      <CompanyFooter name={companyData.name} logo={companyData.logo} color={color} />
    </div>
  );
}

export default CartPage;