import React, { useEffect, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;

function AddProductPage() {
  const { state } = useLocation();
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const [companyInfo, setCompanyInfo] = useState({
    _id: '',
    name: '',
    year:'',
    domain: '',
    tagline: '',
  });

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    image: ''
  });

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    if (state?.name) {
      const slug = state.name.toLowerCase().replace(/\s+/g, '-');
      try {
        const res = await axios.get(`${server}/api/company/name/${slug}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const companyId = res.data._id;
        setCompanyInfo({
          _id: companyId,
          name: state.name,
          domain: state.domain,
          year: state.year,
          tagline: state.tagline
        });

        const productRes = await axios.get(`${server}/api/product/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProducts(productRes.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching company ID.");
      }
    }
  };

  fetchData();
}, [state?.name, token]);


    const fetchProducts = async (companyId) => {
  try{
        const res = await axios.get(`${server}/api/product/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data);
    }
    catch (err) {
        console.error('Error fetching products:', err);
    }
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    try {
      const payload = {
        ...productData,
        companyId: companyInfo._id
      };

      await axios.post(`${server}`+'/api/product', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMsg('Product added successfully!');
      setProductData({
        name: '',
        description: '',
        price: '',
        sku: '',
        image: ''
      });

      await fetchProducts(companyInfo._id);

    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error submitting product');
      }
    }
  }
  const handleDelete = async (productId) => {
    try {
        await axios.delete(`${server}/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        await fetchProducts(companyInfo._id);
    }
    catch (err) {
        console.error('Error deleting product:', err);
    }
  };
  const handlePriceUpdate = async (productId) => {
    try {
        await axios.patch(`${server}/api/product/${productId}/price`,
            { price: newPrice },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingId(null);
        setNewPrice('');
        await fetchProducts(companyInfo._id);
    }
    catch (err) {
        console.error('Error updating price:', err);
    }
  };


  return (
    <div className="mx-40 my-20">
      <h2 className="text-3xl font-bold text-amber-700 mb-6">Add Product for {companyInfo.name}</h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-8 shadow">
        <p><strong>Domain :</strong> {companyInfo.domain}</p>
        <p><strong>Tagline :</strong> {companyInfo.tagline}</p>
        <p><strong>Year Founded :</strong> {companyInfo.year}</p>
      </div>

      {products.length > 0 && (
        <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-amber-700">Added Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {products.map((prod) => (
                <div key={prod._id} className="border rounded-lg p-4 shadow bg-white">
                    <h4 className="text-xl font-bold text-gray-800">{prod.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{prod.description}</p>
                    <img src={prod.image} alt={prod.name} className="w-full h-40 object-cover my-2 rounded" />
                    <p><strong>SKU:</strong> {prod.sku}</p>
                    <p><strong>Price:</strong> ₹{prod.price}</p>

                    {editingId === prod._id ? (
                    <div className="mt-2">
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="New Price"
                            className="border px-2 py-1 rounded mr-2"
                        />
                        <button
                        className="border-2 rounded-md p-2 pl-6 pr-6 bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 hover:border-green-700 transition-colors"
                        onClick={() => handlePriceUpdate(prod._id)}
                        >
                            Save
                        </button>
                    </div>
                    ) : (
                    <button
                        className="border-2 rounded-md p-2 pl-6 pr-6 bg-yellow-700 text-white font-bold hover:bg-white hover:text-yellow-700 hover:border-yellow-700 transition-colors"
                        onClick={() => setEditingId(prod._id)}
                    >
                    Edit Price
                    </button>
                )}
                <button
                className="border-2 rounded-md p-2 pl-6 pr-6 bg-red-700 text-white font-bold hover:bg-white hover:text-red-700 hover:border-red-700 transition-colors"
                onClick={() => handleDelete(prod._id)}
                >
                    Delete
                </button>
            </div>
        ))}
        </div>
    </div>
)}


      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1 ">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
            required
          />
        </div>

        <div className="md:col-span-2 text-center">
          {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
          {msg && <p className="text-green-600 font-semibold mb-4">{msg}</p>}
          <button
            type="submit"
            className=" mb-12 border-2 rounded-md p-2 pl-6 pr-6 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors"
          >
            Add Product
          </button>
          <br></br>
          <NavLink
            to='/dashboard'
            className="border-2 rounded-md p-2 pl-6 pr-6 bg-amber-700 text-white font-bold hover:bg-white hover:text-amber-700 hover:border-amber-700 transition-colors"
          >
            Go to Dashboard
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;