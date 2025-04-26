import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={openCart}
        className="relative p-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Shopping Cart ({totalItems} items)</h3>
              <button onClick={closeCart} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-4" 
                          />
                        )}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border border-gray-300 rounded-md p-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border border-gray-300 rounded-md p-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="ml-4 p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center">
                <div className="font-medium">Total: ${totalPrice.toFixed(2)}</div>
                <button 
                  onClick={closeCart}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/2"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;