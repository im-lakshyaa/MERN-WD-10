import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { Menu, X, ShoppingCart, User, Moon, Sun, Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { user, logout } = useAuth();
  const { search, setSearch } = useSearch();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Theme State (Default to light)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 2. Apply Theme to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- LEFT SIDE: Logo & Mobile Menu --- */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link
              to="/home"
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              HyperMarket
            </Link>

            <div className="hidden md:flex ml-6">
              <Link
                to="/home"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Home
              </Link>
            </div>
          </div>

          {/* --- CENTER: Search Bar --- */}
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <div className="relative w-full group">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
              />
              <Search
                size={18}
                className="absolute right-3 top-2.5 text-gray-400 group-hover:text-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* --- RIGHT SIDE: Actions --- */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* THEME TOGGLE (Desktop) */}
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                // If Dark: Show Sun (Yellow/White)
                <Sun size={24} className="text-yellow-400 fill-yellow-400/20" />
              ) : (
                // If Light: Show Moon (Dark Gray)
                <Moon size={24} className="text-gray-600 fill-gray-600/20" />
              )}
            </button>

            {/* CART */}
            <Link to="/checkout" className="relative p-1">
              <ShoppingCart
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
                size={26}
              />
              {quantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white dark:border-gray-900">
                  {quantity}
                </span>
              )}
            </Link>

            {/* USER PROFILE */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="block rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
              >
                {user?.username ? (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`}
                    alt="avatar"
                    className="w-8 h-8 object-cover"
                  />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 p-1">
                    <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-xl py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  {user ? (
                    <>
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 mb-2">
                        Signed in as <br />
                        <span className="font-semibold text-gray-900 dark:text-white truncate block">
                          {user.username}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
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

        {/* --- MOBILE MENU --- */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-4 animate-in slide-in-from-top-5">
            {/* Mobile Search */}
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Search
                size={20}
                className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400"
              />
            </div>

            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 text-lg font-medium text-gray-800 dark:text-gray-200"
            >
              Home
            </Link>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-2 py-2 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="text-yellow-500" size={20} />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="text-gray-600" size={20} />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;