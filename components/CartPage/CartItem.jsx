"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartTrashIcon, RatingStarIcon } from "./../../public/svgs";
import {
  updateCartQuantity,
  updateQuantityLocally,
} from "@/components/utils/Store/Slices/cartSlice";

const DEBOUNCE_DELAY = 5000;

const CartItem = ({ data, onRemove }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(data.quantity || 1);

  const debounceTimer = useRef(null);
  const pendingQuantity = useRef(null);
  const lastSyncedQuantity = useRef(data.quantity || 1);
  const roundIdRef = useRef(data.round_id);

  useEffect(() => {
    roundIdRef.current = data.round_id;
  }, [data.round_id]);

  useEffect(() => {
    setQuantity(data.quantity || 1);
    lastSyncedQuantity.current = data.quantity || 1;
  }, [data.quantity]);

  const syncWithServer = async (qty) => {
    console.log("🚀 Syncing with server, quantity:", qty);

    try {
      await dispatch(
        updateCartQuantity({
          round_id: roundIdRef.current,
          quantity: qty,
        })
      ).unwrap();

      console.log("✅ Sync successful");
      lastSyncedQuantity.current = qty;
      pendingQuantity.current = null;
    } catch (error) {
      console.log("❌ Sync failed, rolling back");
      setQuantity(lastSyncedQuantity.current);
      dispatch(
        updateQuantityLocally({
          round_id: roundIdRef.current,
          quantity: lastSyncedQuantity.current,
        })
      );
      pendingQuantity.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      // Sync any pending changes immediately on unmount
      if (
        pendingQuantity.current !== null &&
        pendingQuantity.current !== lastSyncedQuantity.current
      ) {
        console.log(
          "🔄 Component unmounting, syncing pending quantity:",
          pendingQuantity.current
        );
        dispatch(
          updateCartQuantity({
            round_id: roundIdRef.current,
            quantity: pendingQuantity.current,
          })
        );
      }
    };
  }, [dispatch]);

  // ✅ Handle quantity change with debounce
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;

    console.log("📝 Quantity changed to:", newQuantity);

    // Update locally immediately
    setQuantity(newQuantity);
    pendingQuantity.current = newQuantity;

    dispatch(
      updateQuantityLocally({
        round_id: data.round_id,
        quantity: newQuantity,
      })
    );

    // Clear previous timer
    if (debounceTimer.current) {
      console.log("⏱️ Clearing previous timer");
      clearTimeout(debounceTimer.current);
    }

    // Set new debounced API call
    console.log("⏱️ Setting new timer for 5 seconds");
    debounceTimer.current = setTimeout(() => {
      console.log("⏰ Timer fired! Syncing quantity:", pendingQuantity.current);
      if (pendingQuantity.current !== null) {
        syncWithServer(pendingQuantity.current);
      }
    }, DEBOUNCE_DELAY);
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handlePlusQuantity = () => {
    if (quantity < 99) {
      handleQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      handleQuantityChange(value);
    }
  };

  return (
    <div className="self-stretch w-full py-8 bg-white border-b-2 border-slate-300 flex flex-col md:flex-row justify-start items-center gap-6 md:gap-0">
      <div className="w-full flex-1 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
        <div
          className="w-full h-56 md:h-auto md:max-w-[256px] self-stretch relative overflow-hidden rounded-lg md:rounded-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%), url("${data.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {!data.store && data.tag && (
            <div className="h-9 px-2.5 py-3 left-[98px] top-[16px] absolute bg-primary-bg rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="justify-center text-text text-xs font-medium">
                {data.tag}
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:flex-1 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
          <div className="w-full inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="self-stretch px-3 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch text-right justify-center text-text text-base font-bold">
                  {data.title}
                </div>
                <div className="self-stretch text-right justify-center text-alt text-sm font-normal line-clamp-2">
                  {data.description}
                </div>
              </div>

              <div className="self-stretch h-9 px-3 inline-flex justify-start items-center gap-8">
                {data.badge && (
                  <div
                    className={`px-9 py-3 ${
                      data.store ? "bg-primary-bg" : "bg-red-400/25"
                    } rounded-[10px] flex justify-center items-center gap-2.5`}
                  >
                    <div className="justify-center text-alt text-xs font-medium">
                      {data.store ? data.tag : data.badge}
                    </div>
                  </div>
                )}
                <div className="h-9 flex justify-center items-center gap-1">
                  <div className="justify-center text-text text-[10px] font-medium">
                    التعليقات :
                  </div>
                  <div className="flex justify-start items-center gap-0.5">
                    <div className="justify-center text-text text-[10px] font-medium">
                      {data.rating}
                    </div>
                    <RatingStarIcon />
                  </div>
                  <div className="justify-center text-text text-[10px] font-medium">
                    ({data.reviews} تقييمًا)
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch p-3 pb-0 flex flex-col justify-center items-start gap-4">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-center text-text text-xs font-medium">
                  الدروس : {data.lessons}
                </div>
                <div className="justify-center text-text text-xs font-medium">
                  المقاعد المتبقية: {data.seats}
                </div>
                <div className="justify-center text-text text-xs font-medium">
                  يبدأ: {data.startDate}
                </div>
              </div>

              <div className="w-full md:w-80 h-0 border-b-2 border-dashed border-neutral-400"></div>

              <div className="inline-flex justify-start items-center gap-[5px]">
                <img
                  className="w-6 h-6 relative rounded-xl object-cover"
                  src={data.teacherImage}
                  alt={data.teacher}
                />
                <div className="justify-center text-text text-[10px] font-medium">
                  المدرس: {data.teacher}
                </div>
              </div>

              <div className="self-stretch px-3 inline-flex justify-between items-center">
                <div className="text-right justify-center text-primary text-xl font-semibold">
                  الكمية
                </div>
                <div className="w-24 px-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-stroke- flex justify-between items-center">
                  <div className="relative overflow-hidden flex flex-col items-center justify-center">
                    <ChvronBottomIcon
                      onClick={handlePlusQuantity}
                      className={`rotate-180 hover:scale-105 h-6 cursor-pointer transition-transform active:scale-95 ${
                        quantity >= 99 ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    />
                    <ChvronBottomIcon
                      onClick={handleMinusQuantity}
                      className={`hover:scale-105 h-6 cursor-pointer transition-transform active:scale-95 ${
                        quantity <= 1 ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                  <input
                    dir="ltr"
                    type="number"
                    min={1}
                    max={99}
                    onChange={handleInputChange}
                    onWheel={(e) => e.target.blur()}
                    className="[direction:ltr] w-full justify-center text-primary text-base font-bold"
                    value={quantity}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:px-0 md:w-36 md:self-stretch md:pl-4 flex flex-row-reverse md:flex-col justify-between items-center">
            <div className="self-stretch text-right md:text-center justify-center text-primary text-2xl font-bold">
              {(data.price * quantity).toFixed(2)} ر.س
            </div>
            <button
              onClick={onRemove}
              className="px-[17.5px] select-none group transition-all cursor-pointer hover:scale-105 hover:text-white hover:bg-danger py-3 rounded-2xl outline outline-2 outline-offset-[-2px] outline-text inline-flex justify-center items-center gap-2 active:scale-95"
            >
              <CartTrashIcon className="group-hover:!stroke-white stroke-[#2D2D2D]" />
              <div className="cursor-pointer whitespace-nowrap text-right justify-center text-text group-hover:text-white text-xs font-medium">
                حذف من السلة
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

const ChvronBottomIcon = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.77481 9.27357C7.86135 9.18685 7.96415 9.11805 8.07732 9.07111C8.19048 9.02416 8.3118 9 8.43432 9C8.55684 9 8.67815 9.02416 8.79132 9.07111C8.90449 9.11805 9.00728 9.18685 9.09383 9.27357L12.7188 14L16.3531 9.27357C16.528 9.09866 16.7653 9.0004 17.0126 9.0004C17.26 9.0004 17.4972 9.09866 17.6721 9.27357C17.847 9.44849 17.9453 9.68572 17.9453 9.93309C17.9453 10.1804 17.847 10.4177 17.6721 10.5926L13.3783 14.8864C13.2918 14.9731 13.189 15.042 13.0758 15.0889C12.9626 15.1358 12.8413 15.16 12.7188 15.16C12.5963 15.16 12.475 15.1358 12.3618 15.0889C12.2486 15.042 12.1458 14.9731 12.0593 14.8864L7.76545 10.5926C7.40997 10.2371 7.40997 9.63841 7.77481 9.27357Z"
      fill="#2D2D2D"
    />
  </svg>
);
