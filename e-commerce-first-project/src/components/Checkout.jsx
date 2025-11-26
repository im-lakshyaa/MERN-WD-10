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

  // 1. State for Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // 2. State for Errors
  const [errors, setErrors] = useState({});

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // 3. Validation Logic
  const validateForm = () => {
    let newErrors = {};
    
    // Basic Fields
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP Code is required";

    // Payment Validation (Simple Regex)
    const cardRegex = /^\d{16}$/; // 16 digits
    if (!formData.cardNumber || !cardRegex.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY
    if (!formData.expiry || !expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Invalid Date (MM/YY)";
    }

    const cvvRegex = /^\d{3,4}$/; // 3 or 4 digits
    if (!formData.cvv || !cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login to place your order.");
      return;
    }

    // 4. Run Validation Check
    if (!validateForm()) {
      alert("Please fix the errors in the form.");
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      try {
        const orderData = {
          email: user.email,
          shippingInfo: formData, // Include shipping info
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

  // Helper helper to make input classes cleaner
  const getInputClass = (fieldName) => {
    return `w-full mt-1 p-2 border rounded-md outline-none transition-colors ${
      errors[fieldName] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2">
            
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={getInputClass("firstName")}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={getInputClass("lastName")}
                    />
                     {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={getInputClass("address")}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={getInputClass("city")}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={getInputClass("state")}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={getInputClass("zip")}
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={getInputClass("cardNumber")}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength="5"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={getInputClass("expiry")}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="123"
                      maxLength="4"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={getInputClass("cvv")}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-md mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm line-clamp-1 w-32">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
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
                <p className="font-semibold text-green-600">Free</p>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4">
                <p>Total</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full mt-6 py-3 rounded-lg font-semibold text-lg text-white transition-all ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/50"
              }`}
            >
              {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;