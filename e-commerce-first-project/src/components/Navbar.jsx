import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearch } from "../context/SearchContext";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const {search,setSearch}=useSearch();
  return (
    <nav className="bg-blue-300 shadow-md p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <Link to="/home" className="text-3xl font-bold text-gray-800">
          HyperMarket
        </Link>

        <div className="hidden md:block">
          <Link to="/home" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-lg mx-4 relative">
        <input
        onChange={(e)=>setSearch(e.target.value)}
        value={search}
          type="text"
          placeholder="Search for products, brands and more"
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Icon Button */}
        <button className="absolute right-2 top-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* Cart Section */}
      <div className="relative ">
        <Link to="/checkout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700 hover:text-gray-900" 
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0L6.116 5.272A1.125 1.125 0 005 4.5H3m4.5 9.75l1.125 6h7.125l1.125-6m0 0h2.25m-6 0V6.75m0 0h4.5M12 6.75H7.5"
            />
          </svg>
        </Link>

        {quantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {quantity}
          </span>
        )}
      </div>

      {/* Login + Signup */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
