import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";

// lucide-react icons
import { Menu, X, ShoppingCart, User, Moon, Sun, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { user, logout } = useAuth();
  const { search, setSearch } = useSearch();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);


  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-all">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* NAVBAR FLEX */}
        <div className="flex justify-between items-center h-16">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* LOGO */}
            <Link 
              to="/home"
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              HyperMarket
            </Link>

            {/* Desktop: Home */}
            <div className="hidden md:flex ml-6">
              <Link 
                to="/home" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Home
              </Link>
            </div>
          </div>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full group">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <Search
                size={20}
                className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">


            {/* CART ICON */}
            <Link to="/checkout" className="relative group">
              <ShoppingCart 
                className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition"
                size={26} 
              />

              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
                  {quantity}
                </span>
              )}
            </Link>

            {/* USER MENU */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 shadow hover:shadow-lg transition"
              >
                {/* Avatar image or fallback icon */}
                {user?.username ? (
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-700 dark:text-gray-200 p-1" />
                )}
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg py-2 animate-fade">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
                        Hello, {user.username}
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-slide-down">

            {/* Mobile Search */}
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search size={20} className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300" />
            </div>

            <Link
              to="/home"
              className="block px-2 py-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
