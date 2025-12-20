"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import CartItem from "../../components/CartPage/CartItem";
import CardSummery from "../../components/CartPage/CardSummery";
import { MobileCartItem } from "../../components/CartPage/MobileCartItem";
import Container from "../../components/ui/Container";
import {
  getUserCart,
  removeFromCart,
  deleteCart,
  removeItemLocally,
  clearCartLocally,
  rollbackCart,
  clearCartMessages,
} from "@/components/utils/Store/Slices/cartSlice";
import LoadingPage from "@/components/shared/Loading";

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { items, totalItems, isLoading, error, successMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (token) {
      dispatch(getUserCart());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearCartMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  // ✅ Updated to handle type and item_id
  const handleRemoveItem = async (type, item_id) => {
    dispatch(removeItemLocally({ type, item_id }));

    try {
      await dispatch(removeFromCart({ type, item_id })).unwrap();
    } catch (error) {
      dispatch(rollbackCart());
    }
  };

  const handleDeleteAll = async () => {
    dispatch(clearCartLocally());

    try {
      await dispatch(deleteCart()).unwrap();
    } catch (error) {
      dispatch(rollbackCart());
    }
  };

  // ✅ Helper to get item data based on type
  const getItemData = (item) => {
    switch (item.type) {
      case "rounds":
        return item.round;
      case "books":
        return item.store || item.book;
      case "bags":
        return item.store || item.bag;
      case "accessories":
        return item.store || item.accessory;
      default:
        return item;
    }
  };

  // ✅ Updated mapper to handle all types
  const mapCartItemToProps = (item) => {
    const itemData = getItemData(item);
    const isRound = item.type === "rounds";

    // Common fields
    const baseProps = {
      id: item.id,
      type: item.type,
      item_id: item.item_id,
      quantity: item.quantity || 1,
      image:
        itemData?.image_url ||
        itemData?.image ||
        "/images/Frame 1000004932.png",
      description: itemData?.description || "",
      price: itemData?.price || 0,
      rating: itemData?.students_rates_avg_rate?.toFixed(1) || 0,
      reviews: itemData?.reviews_count || 32,
      showQuantity: !isRound,
    };

    if (isRound) {
      return {
        ...baseProps,
        tag: itemData?.course_category?.name || "دورة تدريبية",
        badge: itemData?.gender === "male" ? "طلاب" : "طالبات",
        lessons: itemData?.total_days || 0,
        seats: itemData?.capacity || 0,
        startDate: itemData?.start_date
          ? new Date(itemData.start_date).toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "غير محدد",
        teacher: itemData?.teachers?.[0]?.name || "غير محدد",
        teacherImage:
          itemData?.teachers?.[0]?.image_url || "/images/Image-24.png",
        store: false,
        title: itemData?.name,
      };
    } else {
      return {
        ...baseProps,
        tag: getTypeLabel(item.type),
        badge: getTypeLabel(item.type),
        store: true,

        category: itemData?.category?.name || "",
        stock: itemData?.stock || 0,
        title: itemData?.title,
      };
    }
  };

  // ✅ Get Arabic label for type
  const getTypeLabel = (type) => {
    const labels = {
      books: "كتاب",
      bags: "حقيبة",
      accessories: "أدوات",
      rounds: "دورة",
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container className="">
      <CourseTitle
        title="السلة"
        breadcrumbs={[
          { title: "الرئيسية", link: "/" },
          { title: "السلة", link: "#" },
        ]}
      />

      {error && (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg animate-slide-up">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg animate-slide-up">
          {successMessage}
        </div>
      )}

      {Array.isArray(items) && items.length > 0 ? (
        <div className="flex items-start justify-between gap-6 mb-[43px]">
          <div className="flex-1">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-auto py-2 md:h-[45px] inline-flex justify-between items-center">
                <div className="text-right">
                  <span className="text-text text-lg sm:text-xl md:text-2xl font-medium">
                    عدد العناصر:{" "}
                  </span>
                  <span className="text-secondary text-lg sm:text-xl md:text-2xl font-bold">
                    {totalItems}
                  </span>
                </div>

                <button
                  onClick={handleDeleteAll}
                  className="cursor-pointer text-right text-secondary text-lg sm:text-xl md:text-2xl font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-secondary rounded-md transition-all duration-200 active:scale-95"
                  aria-label="حذف كل العناصر من السلة"
                  type="button"
                >
                  حذف الكل
                </button>
              </div>

              <div className="flex flex-col gap-7 md:gap-2">
                {items.map((item, index) => {
                  const mappedData = mapCartItemToProps(item);

                  return (
                    <div key={`${item.type}-${item.item_id}-${index}`}>
                      <div className="lg:hidden">
                        <MobileCartItem
                          data={mappedData}
                          onRemove={() =>
                            handleRemoveItem(item.type, item.item_id)
                          }
                        />
                      </div>

                      <div className="hidden lg:block">
                        <CartItem
                          data={mappedData}
                          onRemove={() =>
                            handleRemoveItem(item.type, item.item_id)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="block lg:hidden">
                  <CardSummery />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block sticky top-[140px]">
            <CardSummery />
          </div>
        </div>
      ) : (
        <section className="flex items-center justify-center flex-col w-full mb-[97px]">
          <div className="flex items-center justify-center">
            <img
              loading="lazy"
              className="w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
              src="/images/CART 1.png"
              alt="empty cart"
            />
          </div>
          <div className="flex mb-[48px] items-center justify-center text-text-alt text-xl text-center md:text-[32px] text-bold">
            عربة التسوق فارغة. استمر في التسوق للعثور على دورة!
          </div>
          <button
            type="button"
            onClick={() => router.push("/store")}
            className="inline-flex items-center justify-center gap-2.5 px-8 md:px-20 py-4 md:py-6 bg-secondary rounded-[10px] md:rounded-[25px] hover:bg-secondary-dark transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 active:scale-[.99]"
          >
            <span className="font-bold text-white text-sm md:text-base leading-none">
              العودة إلى المتجر
            </span>
          </button>
        </section>
      )}
    </Container>
  );
};

export default CartPage;
