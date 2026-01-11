"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getUserCart,
} from "@/components/utils/Store/Slices/cartSlice";

export const ProductCard = ({ data, getCategoryLabel }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // ✅ Check if item is a round (no quantity control for rounds)
  const isRound = data.type === "rounds";

  // ✅ Find item in cart
  const cartItem = cartItems.find(
    (item) => item.item_id === data.id && item.type === data.type
  );

  const isInCart = !!cartItem;

  // ✅ Sync local quantity with cart
  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(cartItem.quantity);
    } else {
      setLocalQuantity(0);
    }
  }, [cartItem]);

  const debouncedUpdate = useCallback(
    (newQuantity) => {
      // Don't debounce for rounds
      if (isRound) return;

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(async () => {
        setIsUpdating(true);
        try {
          if (newQuantity <= 0) {
            await dispatch(
              removeFromCart({
                type: data.type,
                item_id: data.id,
              })
            ).unwrap();
          } else {
            await dispatch(
              updateCartQuantity({
                type: data.type,
                item_id: data.id,
                quantity: newQuantity,
              })
            ).unwrap();
          }
          dispatch(getUserCart());
        } catch (error) {
          console.error("Failed to update cart:", error);
          if (cartItem) {
            setLocalQuantity(cartItem.quantity);
          }
        } finally {
          setIsUpdating(false);
        }
      }, 3000);

      setDebounceTimer(timer);
    },
    [debounceTimer, dispatch, data.type, data.id, cartItem, isRound]
  );

  // ✅ Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // ✅ Handle add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!token) {
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        addToCart({
          type: data.type,
          item_id: data.id,
          quantity: 1,
        })
      ).unwrap();

      setLocalQuantity(1);
      dispatch(getUserCart());
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle remove from cart
  const handleRemoveFromCart = async (e) => {
    e.stopPropagation();

    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    setIsLoading(true);

    try {
      await dispatch(
        removeFromCart({
          type: data.type,
          item_id: data.id,
        })
      ).unwrap();

      setLocalQuantity(0);
      dispatch(getUserCart());
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle increase quantity (only for non-rounds)
  const handleIncrease = (e) => {
    e.stopPropagation();
    if (isRound) return;

    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    debouncedUpdate(newQuantity);
  };

  // ✅ Handle decrease quantity (only for non-rounds)
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (isRound) return;

    const newQuantity = localQuantity - 1;

    if (newQuantity <= 0) {
      handleRemoveFromCart(e);
    } else {
      setLocalQuantity(newQuantity);
      debouncedUpdate(newQuantity);
    }
  };

  const handleCardClick = () => {
    if (isRound) {
      router.push(`/courses/${data.id}`);
    } else {
      router.push(`/store/${data.type}/${data.id}`);
    }
  };

  const categoryLabel = getCategoryLabel
    ? getCategoryLabel(data.category)
    : data.category;

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // ✅ Render cart button based on type
  const renderCartButton = () => {
    // For Rounds: Simple Add/Remove toggle
    if (isRound) {
      if (isInCart) {
        return (
          <button
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative w-full mt-5 md:mt-0 md:w-auto rounded-[10px] transition-all duration-200 cursor-pointer bg-red-500 hover:bg-red-600 text-white ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleRemoveFromCart}
            disabled={isLoading}
            aria-label={`حذف ${data.title} من السلة`}
            type="button"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="text-sm text-center leading-5 whitespace-nowrap">
                  حذف من السلة
                </span>
              </>
            )}
          </button>
        );
      } else {
        return (
          <button
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative w-full mt-5 md:mt-0 md:w-auto rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-neutral-50 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label={`إضافة ${data.title} إلى السلة`}
            type="button"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm text-center leading-5 whitespace-nowrap">
                  اضف الي السلة
                </span>
              </>
            )}
          </button>
        );
      }
    }

    // For Other Types (books, bags, accessories): Quantity Controls
    if (isInCart && localQuantity > 0) {
      return (
        <div
          className="inline-flex items-center justify-center gap-2 relative w-full md:w-auto mt-5 md:mt-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decrease Button */}
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-[10px] transition-all duration-200 ${
              localQuantity <= 1
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDecrease}
            disabled={isLoading}
            aria-label="تقليل الكمية"
            type="button"
          >
            {localQuantity <= 1 ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            )}
          </button>

          {/* Quantity Display */}
          <div className="w-12 h-10 flex items-center justify-center bg-gray-100 rounded-[10px] font-bold text-lg text-primary relative">
            {isLoading || isUpdating ? (
              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {localQuantity}
                {/* Pending indicator */}
                {debounceTimer && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                )}
              </>
            )}
          </div>

          {/* Increase Button */}
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-[10px] bg-primary hover:bg-primary-dark text-white transition-all duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleIncrease}
            disabled={isLoading}
            aria-label="زيادة الكمية"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      );
    }

    // Add to Cart Button (for non-rounds when not in cart)
    return (
      <button
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative w-full mt-5 md:mt-0 md:w-auto rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-neutral-50 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleAddToCart}
        disabled={isLoading}
        aria-label={`إضافة ${data.title} إلى السلة`}
        type="button"
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm text-center leading-5 whitespace-nowrap">
              اضف الي السلة
            </span>
          </>
        )}
      </button>
    );
  };

  return (
    <article
      onClick={handleCardClick}
      className="flex flex-col w-full h-auto md:h-[426px] items-center gap-6 md:gap-8 pt-0 pb-6 md:pb-8 px-0 relative bg-white rounded-[30px] border-[3px] border-solid border-[#d7e6ff] cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
      role="article"
      aria-label={`${data.title} - منتج`}
    >
      {/* ✅ Cart Badge */}
      {isInCart && (
        <div className="absolute top-3 right-3 z-20 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          في السلة
        </div>
      )}

      {/* Image Section */}
      <div className="relative self-stretch w-full h-[180px] md:h-[222px] rounded-[30px_30px_0px_0px] overflow-hidden">
        {/* Category Badge */}
        <span
          className="absolute top-3 left-3 z-10 bg-primary-light text-primary font-bold text-xs md:text-sm px-3 py-1 rounded-full shadow whitespace-nowrap"
          style={{ direction: "rtl" }}
        >
          {categoryLabel}
        </span>

        {/* Round Badge - Gender */}
        {isRound && data.gender && (
          <span
            className={`absolute top-12 right-3 z-10 ${
              data.gender === "male"
                ? "bg-blue-100 text-blue-600"
                : "bg-pink-100 text-pink-600"
            } font-bold text-xs px-3 py-1 rounded-full shadow`}
          >
            {data.gender === "male" ? "طلاب" : "طالبات"}
          </span>
        )}

        {/* Product Image */}
        <div
          role="img"
          aria-label={`صورة ${data.title}`}
          className="absolute inset-0 w-full h-full rounded-[30px_30px_0px_0px] bg-gray-100"
          style={{
            backgroundImage: `url('${data.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start justify-between px-4 py-0 relative flex-1 self-stretch w-full grow">
        <header className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="relative w-full mt-[-1.00px] text-text text-xl md:text-2xl text-right leading-6 line-clamp-1">
            {data.title}
          </h1>
          <p className="self-stretch text-text-alt text-sm md:text-base leading-5 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] relative text-right">
            {data.description}
          </p>

          {/* Round-specific info */}
          {isRound && (
            <div className="flex items-center gap-2 text-xs text-text-alt">
              {data.teacher && (
                <div className="flex items-center gap-1">
                  <img
                    loading="lazy"
                    src={data.teacherImage || "/images/default-avatar.png"}
                    alt={data.teacher}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{data.teacher}</span>
                </div>
              )}
              {data.totalDays && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {data.totalDays} يوم
                </span>
              )}
            </div>
          )}
        </header>

        <footer className="flex flex-col md:flex-row h-auto md:h-10 items-start md:items-center justify-start md:justify-between relative self-stretch w-full gap-4 mt-4 md:mt-0">
          {/* Price */}
          <div
            className="inline-flex h-6 items-center relative flex-[0_0_auto]"
            role="text"
            aria-label={`السعر: ${formatPrice(data.price)} ريال سعودي`}
          >
            <span className="self-stretch w-fit text-text font-bold text-lg text-left leading-6 whitespace-nowrap relative">
              {formatPrice(data.price)} ر.س
            </span>
          </div>

          {/* ✅ Cart Controls */}
          {renderCartButton()}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
