import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const { search } = useSearch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8">
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} productObj={product} />
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center">
              No products found for "{search}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
