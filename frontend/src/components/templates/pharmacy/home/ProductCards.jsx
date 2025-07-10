import React, { useEffect, useState } from 'react';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;


function ProductCards({ product, onDeleteSuccess }) {
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
    <div className="w-full max-w-lg flex border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-all text-center">

      <div className="w-1/3 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-contain rounded-md border"
        />
      </div>

      <div className="w-2/3 pl-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-4 text-wrap">{product.description}</p>

          {editingPrice ? (
            <div className="mb-4">
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border px-2 py-1 w-32 rounded text-sm"
              />
              <button
                onClick={handleEditPrice}
                className="ml-2 px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-white hover:text-blue-600 hover:border-blue-600 border transition"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="inline-block mt-2 px-3 py-1 bg-blue-100 text-neutral-700 rounded-full text-lg font-semibold mb-4">
              ₹ {currentPrice}
            </p>
          )}

          <p className="text-xs text-gray-400">SKU: {product.sku}</p>
        </div>

        <div className="mt-4">
          {role === 'adminCompany' && !editingPrice && (
            <div className="flex gap-4 justify-between px-8">
              <button
                className="px-4 py-1 rounded bg-yellow-500 text-white text-md hover:bg-white hover:text-yellow-500 hover:border-yellow-500 border transition"
                onClick={() => setEditingPrice(true)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1 rounded bg-red-600 text-white text-md hover:bg-white hover:text-red-600 hover:border-red-600 border transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          {role === 'userCompany' && (
            <>
              {!showQtyInput ? (
                <button
                  className="mt-2 px-4 py-1 rounded bg-green-600 text-white text-md hover:bg-white hover:text-green-600 hover:border-green-600 border transition"
                  onClick={() => setShowQtyInput(true)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="mt-2 flex flex-col gap-2">
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-sm"
                    placeholder="Enter quantity"
                  />
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-white hover:text-blue-600 hover:border-blue-600 border transition"
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
                </div>
              )}
            </>
          )}
        </div>

        {message && (
          <p className="text-sm text-gray-600 mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ProductCards;
