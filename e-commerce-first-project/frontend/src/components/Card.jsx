import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Star, ShoppingBag, Minus, Plus, Heart } from "lucide-react";

const ProductCard = ({ productObj }) => {
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
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={`${
              index < Math.round(rating)
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative w-full max-w-xs bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* 🖼 Product Image Area */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Discount Badge */}
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
          -{productObj.discountPercentage.toFixed(0)}%
        </span>

        {/* Wishlist Button (Visual Only) */}
        <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <Heart size={18} />
        </button>

        <img
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          src={productObj.thumbnail}
          alt={productObj.title}
        />
      </div>

      {/* 📝 Content Area */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* Title & Rating */}
        <div>
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-gray-900 dark:text-white font-bold text-lg leading-tight line-clamp-1" title={productObj.title}>
              {productObj.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
             {renderStars(productObj.rating)}
             <span className="text-xs text-gray-500 font-medium pt-0.5">({productObj.rating})</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-end gap-2 my-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${discountedPrice}
          </span>
          <span className="text-sm text-gray-400 line-through mb-1">
            ${productObj.price.toFixed(2)}
          </span>
        </div>

        {/* 🛒 Action Area */}
        <div className="mt-auto pt-3">
          {productInCart ? (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => dispatch(decreaseQuantity(productObj))}
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>

              <span className="font-bold text-gray-900 dark:text-white w-8 text-center">
                {quantity}
              </span>

              <button
                onClick={() => dispatch(increaseQuantity(productObj))}
                className="w-10 h-10 flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(productObj))}
              className="w-full h-[50px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;