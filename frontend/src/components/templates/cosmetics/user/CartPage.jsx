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

  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_kcXihqGrEExsdx",
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
              navigate(`/cosmetics/${slugifyName(companyData.name)}/my-orders`);
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
    <div className="min-h-screen flex flex-col">
      
      
        <CompanyNavbar name={companyData.name} logo={companyData.logo} color={color} />

      <div className="flex-grow p-6 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6 text-center">Your Cart</h2>

        {userData && (
          <p className="text-md text-gray-600 mb-4 text-center">
            Logged in as <strong>{userData.username}</strong> ( {userData.email} )
          </p>
        )}
        {paymentSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            {paymentSuccessMsg}
          </div>
        )}
        {cartItems.length === 0 ? (
          <p className="text-xl text-red-500 font-bold text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-8 mx-12">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.productName}</h3>
                    <p className="text-gray-700">₹ {item.price} x {item.qty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold">₹ {item.price * item.qty}</p>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-4 flex justify-end">
              <h3 className="text-xl font-bold">Total: ₹ {totalPrice}</h3>
            </div>
             <div className='w-full text-center'>
            <button
          className='min-w-32 border-2 rounded-md p-2 px-4 font-bold transition-colors mt-6'
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
          onClick={handlePayment}
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