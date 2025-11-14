import React from "react";
import Card from "./Card.jsx";
import products from "../product-api/product.js";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const { search } = useSearch();

  // Filter products based on search text
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8">
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
    </div>
  );
};

export default Home;
