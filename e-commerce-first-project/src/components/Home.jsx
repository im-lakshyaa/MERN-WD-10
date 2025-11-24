import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const { search } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=500");
        setProducts(res.data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

      {/* 🔥 Animated page heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center tracking-wide">
        Explore Products
      </h1>

      {/* Loading Skeleton Shimmer */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 w-full rounded-xl"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {/* No Products Found */}
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-xl text-center mt-10">
              No products found for <span className="font-semibold">"{search}"</span>
            </p>
          ) : (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                gap-6 justify-items-center animation-fade"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full transition-transform hover:scale-105 duration-200"
                >
                  <Card productObj={product} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
