import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";

const Card = ({ productObj }) => {
  const dispatch = useDispatch();

  const productInCart = useSelector((state) =>
    state.cart.find((item) => item.id === productObj.id)
  );

  const quantity = productInCart?.quantity || 0;

  const discountedPrice = (
    productObj.price -
    (productObj.price * productObj.discountPercentage) / 100
  ).toFixed(2);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        className={
          index < Math.round(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }
      />
    ));
  };

  return (
    <div className="
      bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl 
      transition-all duration-300 overflow-hidden w-72 cursor-pointer
      group border border-gray-100 dark:border-gray-700
    ">
      {/* 🖼 Product Image */}
      <figure className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={productObj.thumbnail}
          alt={productObj.title}
        />

        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {productObj.discountPercentage.toFixed(0)}% OFF
        </div>
      </figure>

      {/* Content */}
      <div className="p-4 flex flex-col h-full dark:text-gray-200">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {productObj.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center mt-2 gap-1">
          {renderStars(productObj.rating)}
          <span className="text-sm text-gray-600 dark:text-gray-300">
            ({productObj.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            ${discountedPrice}
          </p>
          <p className="line-through text-gray-500 dark:text-gray-400 text-sm">
            ${productObj.price.toFixed(2)}
          </p>
        </div>

        {/* Cart Controls */}
        <div className="mt-4 flex-grow flex items-end">
          {productInCart ? (
            <div className="flex justify-between items-center w-full bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <button
                onClick={() => dispatch(decreaseQuantity(productObj))}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                <Minus size={18} />
              </button>

              <span className="text-lg font-semibold dark:text-white">{quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(productObj))}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(productObj))}
              className="
                w-full flex justify-center items-center gap-2 
                bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg 
                font-semibold transition-all duration-300
              "
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
