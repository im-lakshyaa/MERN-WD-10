import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE – PRODUCT LIST */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4">
          <div className="grid grid-cols-4 font-semibold text-gray-700 py-2 border-b">
            <p className="col-span-2">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center py-4 border-b last:border-none"
            >
              <div className="col-span-2 flex items-center space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-medium text-gray-800">
                  {item.title}
                </span>
              </div>

              <p className="font-medium">${item.price.toFixed(2)}</p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="bg-white shadow-md rounded-lg p-4 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between py-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">${subtotal}</p>
          </div>

          <div className="flex justify-between py-2 border-b">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium">Free</p>
          </div>

          <div className="flex justify-between py-4 text-lg font-bold">
            <p>Total</p>
            <p>${subtotal}</p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-semibold mt-3">
            <Link to="/checkout">
            Proceed to Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
