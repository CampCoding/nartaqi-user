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
  const [showDetails, setShowDetails] = useState(false); // ✅ State للتفاصيل

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
      if (isRound) return;

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

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

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

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (isRound) return;

    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    debouncedUpdate(newQuantity);
  };

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
      router.push(`/course/${data.id}`);
    }
  };

  // ✅ Toggle Details
  const handleToggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const categoryLabel = getCategoryLabel
    ? getCategoryLabel(data.category)
    : data.category;

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const renderCartButton = () => {
    if (isRound) {
      if (isInCart) {
        return (
          <button
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-1 rounded-[10px] transition-all duration-200 cursor-pointer bg-red-500 hover:bg-red-600 text-white ${
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
                  حذف
                </span>
              </>
            )}
          </button>
        );
      } else {
        return (
          <button
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-1 rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-neutral-50 ${
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
                  اضف للسلة
                </span>
              </>
            )}
          </button>
        );
      }
    }

    if (isInCart && localQuantity > 0) {
      return (
        <div
          className="inline-flex items-center justify-center gap-2 relative flex-1"
          onClick={(e) => e.stopPropagation()}
        >
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

          <div className="w-12 h-10 flex items-center justify-center bg-gray-100 rounded-[10px] font-bold text-lg text-primary relative">
            {isLoading || isUpdating ? (
              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {localQuantity}
                {debounceTimer && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                )}
              </>
            )}
          </div>

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

    return (
      <button
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-1 rounded-[10px] transition-all duration-200 cursor-pointer bg-primary hover:bg-primary-dark text-neutral-50 ${
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
              اضف للسلة
            </span>
          </>
        )}
      </button>
    );
  };

  return (
    <>
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
            className="absolute inset-0 w-full h-full rounded-[27px_27px_0px_0px] bg-gray-100"
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

          <footer className="flex flex-col gap-3 relative self-stretch w-full mt-4 md:mt-0">
            {/* Price Row */}
            <div className="flex items-center justify-between">
              <div
                className="inline-flex h-6 items-center relative flex-[0_0_auto]"
                role="text"
                aria-label={`السعر: ${formatPrice(data.price)} ريال سعودي`}
              >
                <span className="self-stretch w-fit text-text font-bold text-lg text-left leading-6 whitespace-nowrap relative">
                  {formatPrice(data.price)} ر.س
                </span>
              </div>
            </div>

            {/* ✅ Buttons Row - Cart + Details */}
            <div className="flex items-center gap-2 w-full">
              {/* Cart Controls */}
              {renderCartButton()}

              {/* ✅ Details Button */}
              <button
                onClick={handleToggleDetails}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-gray-200 text-text border border-gray-200 hover:border-gray-300"
                aria-label="عرض التفاصيل"
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-center leading-5 whitespace-nowrap">
                  تفاصيل
                </span>
              </button>
            </div>
          </footer>
        </div>
      </article>

      {/* ✅ Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleToggleDetails}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-text">{data.title}</h2>
              <button
                onClick={handleToggleDetails}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="إغلاق"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Product Image */}
              <div className="relative w-full h-48 rounded-[15px] overflow-hidden mb-4">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary-light text-primary font-bold text-xs px-3 py-1 rounded-full">
                  {categoryLabel}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4 p-3 bg-primary-light rounded-[10px]">
                <span className="text-text-alt font-medium">السعر:</span>
                <span className="text-primary font-bold text-xl">
                  {formatPrice(data.price)} ر.س
                </span>
              </div>

              {/* Round-specific info */}
              {isRound && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.teacher && (
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-[10px]">
                      <img
                        loading="lazy"
                        src={data.teacherImage || "/images/default-avatar.png"}
                        alt={data.teacher}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-text">{data.teacher}</span>
                    </div>
                  )}
                  {data.totalDays && (
                    <div className="bg-gray-100 px-3 py-2 rounded-[10px] text-sm text-text">
                      📅 {data.totalDays} يوم
                    </div>
                  )}
                  {data.totalHours && (
                    <div className="bg-gray-100 px-3 py-2 rounded-[10px] text-sm text-text">
                      ⏱️ {data.totalHours} ساعة
                    </div>
                  )}
                  {data.gender && (
                    <div
                      className={`px-3 py-2 rounded-[10px] text-sm ${
                        data.gender === "male"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-pink-100 text-pink-600"
                      }`}
                    >
                      {data.gender === "male" ? "👨 طلاب" : "👩 طالبات"}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-text mb-2">الوصف</h3>
                <div
                  className="text-text-alt text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: data.description || "لا يوجد وصف متاح",
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-4 border-t border-gray-100 bg-gray-50">
              {/* Add to Cart in Modal */}
              <button
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] transition-all duration-200 cursor-pointer ${
                  isInCart
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-primary hover:bg-primary-dark text-white"
                } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
                disabled={isLoading}
                type="button"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : isInCart ? (
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
                    <span>حذف من السلة</span>
                  </>
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
                    <span>إضافة للسلة</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={handleToggleDetails}
                className="px-6 py-3 rounded-[10px] bg-gray-200 hover:bg-gray-300 text-text transition-colors"
                type="button"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
