import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CloseIcon, RatingStarIcon } from "../../public/svgs";
import {
  updateCartQuantity,
  updateQuantityLocally,
} from "@/components/utils/Store/Slices/cartSlice";

const DEBOUNCE_DELAY = 5000;

export const MobileCartItem = ({ data, onRemove }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(data.quantity || 1);

  const debounceTimer = useRef(null);
  const pendingQuantity = useRef(null);
  const lastSyncedQuantity = useRef(data.quantity || 1);

  // ✅ Store type and item_id in refs
  const typeRef = useRef(data.type);
  const itemIdRef = useRef(data.item_id);

  useEffect(() => {
    typeRef.current = data.type;
    itemIdRef.current = data.item_id;
  }, [data.type, data.item_id]);

  useEffect(() => {
    setQuantity(data.quantity || 1);
    lastSyncedQuantity.current = data.quantity || 1;
  }, [data.quantity]);

  const syncWithServer = async (qty) => {
    console.log("📱 Mobile - Syncing with server:", {
      type: typeRef.current,
      item_id: itemIdRef.current,
      quantity: qty,
    });

    try {
      await dispatch(
        updateCartQuantity({
          type: typeRef.current,
          item_id: itemIdRef.current,
          quantity: qty,
        })
      ).unwrap();

      console.log("✅ Mobile - Sync successful");
      lastSyncedQuantity.current = qty;
      pendingQuantity.current = null;
    } catch (error) {
      console.log("❌ Mobile - Sync failed, rolling back");
      setQuantity(lastSyncedQuantity.current);
      dispatch(
        updateQuantityLocally({
          type: typeRef.current,
          item_id: itemIdRef.current,
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
      if (
        pendingQuantity.current !== null &&
        pendingQuantity.current !== lastSyncedQuantity.current
      ) {
        dispatch(
          updateCartQuantity({
            type: typeRef.current,
            item_id: itemIdRef.current,
            quantity: pendingQuantity.current,
          })
        );
      }
    };
  }, [dispatch]);

  const handleQuantityChange = (newQuantity) => {
    if (!data.showQuantity) return; // ✅ Don't allow for rounds
    if (newQuantity < 1 || newQuantity > 99) return;

    setQuantity(newQuantity);
    pendingQuantity.current = newQuantity;

    dispatch(
      updateQuantityLocally({
        type: data.type,
        item_id: data.item_id,
        quantity: newQuantity,
      })
    );

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (pendingQuantity.current !== null) {
        syncWithServer(pendingQuantity.current);
      }
    }, DEBOUNCE_DELAY);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity < 99) {
      handleQuantityChange(quantity + 1);
    }
  };

  // ✅ Get badge color based on type
  const getBadgeColor = () => {
    if (data.store) {
      return "bg-primary-bg";
    }
    return "bg-[#f08b9b]";
  };

  return (
    <article className="flex w-full items-start justify-start relative bg-white rounded-[20px] overflow-hidden border-2 border-solid border-variable-collection-stroke">
      <div
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%), url("${data.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative self-stretch w-[146px]"
      >
        <div
          className={`inline-flex items-center justify-center gap-2.5 px-4 py-2 absolute top-3 right-3 ${getBadgeColor()} rounded-[10px]`}
        >
          <span
            className={`w-fit font-normal ${
              data.store ? "text-alt" : "text-white"
            } text-[10px]`}
          >
            {data.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full items-start px-0 py-4 relative">
        <div className="flex flex-col items-start gap-4 pt-0 pb-2 px-0 pl-4 relative self-stretch w-full">
          <div className="flex flex-col items-start w-full pr-2">
            <header className="flex items-start justify-between pl-0  py-0 relative self-stretch w-full">
              <h1 className="flex-1 font-bold text-sm">{data?.title}</h1>{" "}
              <CloseIcon
                onClick={onRemove}
                width={30}
                height={30}
                className="cursor-pointer active:bg-red-200 rounded-full transition-colors"
              />
            </header>

            <p className="self-stretch text-right justify-center text-alt text-sm font-normal line-clamp-2">
              {data.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 relative self-stretch w-full">
            <div className="flex items-center justify-between pl-0 pr-2 py-0 relative self-stretch w-full">
              <div className="inline-flex items-center justify-center gap-2.5 p-2 bg-[#c2d8fc] rounded-[10px]">
                <span className="text-[10px]">{data.tag}</span>
              </div>
              <div className="inline-flex items-center gap-0.5">
                <span className="text-[10px] font-medium">{data.rating}</span>
                <RatingStarIcon />
              </div>
            </div>

            {/* ✅ Conditional info based on type */}
            {!data.store ? (
              // Round info
              <div className="flex items-center justify-between pl-0 pr-2 py-0 relative self-stretch w-full">
                <span className="text-[10px] font-medium text-text">
                  الدروس: {data.lessons}
                </span>
                <span className="text-[10px] font-medium text-text">
                  المقاعد: {data.seats}
                </span>
              </div>
            ) : (
              // Store item info with quantity
              data.showQuantity && (
                <div className="flex items-center justify-between pl-0 pr-2 py-0 relative self-stretch w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-text">
                      الكمية:
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleMinus}
                        className={`w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold transition-transform active:scale-90 ${
                          quantity <= 1 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-primary">
                        {quantity}
                      </span>
                      <button
                        onClick={handlePlus}
                        className={`w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold transition-transform active:scale-90 ${
                          quantity >= 99 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}

            <footer className="flex items-center justify-between pl-0 pr-2 pt-2 pb-0 relative self-stretch w-full border-t border-variable-collection-stroke">
              {!data.store ? (
                <div className="inline-flex items-center gap-[5px]">
                  <img
                    loading="lazy"
                    className="w-4 h-4 rounded-xl object-cover"
                    src={data.teacherImage}
                    alt={data.teacher}
                  />
                  <span className="text-[10px] font-medium">
                    المدرس: {data.teacher}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-[5px]">
                  {data.category && (
                    <span className="text-[10px] font-medium">
                      {data.category}
                    </span>
                  )}
                </div>
              )}
              <div className="font-bold text-blue-500 text-base">
                {(data.price * quantity).toFixed(2)} ر.س
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
};
