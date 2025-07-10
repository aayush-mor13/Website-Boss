import React, { useEffect, useState } from 'react';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;


function ProductCards({ product,  onDeleteSuccess }) {
  const [showQtyInput, setShowQtyInput] = useState(false);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [editingPrice, setEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [currentPrice, setCurrentPrice] = useState(product.price);

  useEffect(() => {
    const newUserId = localStorage.getItem("companyUserId");
    const token = localStorage.getItem("companyToken");
    const newRole = localStorage.getItem("companyUserRole");
    setRole(newRole);
    setUserId(newUserId);
    setToken(token);
  }, []);

  const handleAddToCart = async () => {
    if (!qty || qty < 1) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    try {
      const res = await axios.post(
        `${server}`+'/api/cart/add',
        {
          userId,
          companyId: product.companyId,
          productId: product._id,
          qty: parseInt(qty)
        },
        {
          headers: {
            'company-token': token
          }
        }
      );

      setMessage(res.data.message);
      setShowQtyInput(false);
      setQty(1);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setMessage("Failed to add item to cart.");
    }
  };

  const handleEditPrice = async () => {
    if (!newPrice || isNaN(newPrice) || newPrice <= 0) {
      setMessage("Enter a valid new price.");
      return;
    }

    try {
      const res = await axios.patch(
        `${server}/api/product/${product._id}/price`,
        { price: newPrice },
        {
            headers: {
                'company-token': token
            }
        }
      );

      setMessage(res.data.message || "Price updated successfully");
      setCurrentPrice(newPrice);
      setEditingPrice(false);
    } catch (err) {
      console.error("Error updating price:", err);
      setMessage("Failed to update price.");
    }
  };

  const handleDelete = async () => {
  try {
    const res = await axios.delete(`${server}/api/product/${product._id}`, {
      headers: {
        'company-token': token
      }
    });

    setMessage(res.data.message || "Deleted successfully");
    onDeleteSuccess(product._id);
  } catch (err) {
    console.error("Error deleting product:", err);
    setMessage("Failed to delete product.");
  }
};

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-[300px] flex flex-col justify-between">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>

      {editingPrice ? (
        <div className="mb-2 text-center">
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="border px-2 py-1 w-full mb-2 rounded"
          />
          <button
            onClick={handleEditPrice}
            className="min-w-32 border-2 rounded-md p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors"
          >
            Save Price
          </button>
        </div>
      ) : (
        <p className="text-gray-900 font-semibold mb-2">₹ {currentPrice}</p>
      )}

      <p className="text-gray-500 text-sm mb-2">SKU: {product.sku}</p>

      {role === 'adminCompany' && !editingPrice && (
        <div className="flex justify-between mt-4">
          <button
            className="min-w-32 border-2 rounded-md p-2 bg-yellow-500 text-white font-bold hover:bg-white hover:text-yellow-500 hover:border-yellow-500 transition-colors"
            onClick={() => setEditingPrice(true)}
          >
            Edit
          </button>
          <button
            className="min-w-32 border-2 rounded-md p-2 bg-red-700 text-white font-bold hover:bg-white hover:text-red-700 hover:border-red-700 transition-colors"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      {role === 'userCompany' && (
        <div className="mt-4 text-center">
          {!showQtyInput ? (
            <button
              className="min-w-32 border-2 rounded-md p-2 bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 hover:border-green-700 transition-colors"
              onClick={() => setShowQtyInput(true)}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="Enter quantity"
              />
              <button
                className="min-w-32 border-2 rounded-md p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors"
                onClick={handleAddToCart}
              >
                Confirm
              </button>
              <button
                className="text-sm text-gray-500 hover:underline"
                onClick={() => {
                  setShowQtyInput(false);
                  setMessage('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {message && (
        <p className="text-sm text-center mt-2 text-gray-600">{message}</p>
      )}
    </div>
  );
}

export default ProductCards;
