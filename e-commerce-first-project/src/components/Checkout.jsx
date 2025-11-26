import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  
  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login to place your order.");
      return;
    }

    setIsProcessing(true);

    
    setTimeout(async () => {
      try {
        const orderData = {
          email: user.email,
          items: cart.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: totalAmount.toFixed(2),
        };

        console.log("Sending orderData =>", orderData);
        const res = await api.post("/api/order/confirm", orderData);

        alert(`Payment Successful! Order ID: ${res.data.orderId}`);

        dispatch(clearCart());
        navigate("/home");
      } catch (error) {
        console.error(error);
        alert("Something went wrong while placing your order.");
      }

      setIsProcessing(false);
    }, 2000); 
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
          <div className="lg:col-span-2">

            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" />
                  </div>
                </div>
              </form>
            </div>

            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </form>
            </div>

          </div>

          
          <div className="bg-white shadow-md rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-md mr-4"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">${totalAmount.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold">Free</p>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <p>Total</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full mt-6 py-3 rounded-lg font-semibold text-lg text-white transition ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing
                ? "Processing..."
                : `Pay $${totalAmount.toFixed(2)}`}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
