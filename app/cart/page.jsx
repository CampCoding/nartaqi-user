"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import CartItem from "../../components/CartPage/CartItem";
import CardSummery from "../../components/CartPage/CardSummery";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      image: "/images/Frame 1000004932.png",
      tag: "مهارات التعليم والتدريس",
      title: "إتقان التدريس الفعال",
      description:
        "تعرف على المبادئ الأساسية والاستراتيجيات العملية لتصبح معلمًا واثقًا ومؤثرًا.",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      price: 95,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/dollars.png",
      tag: "مهارات التعليم والتدريس",
      title: "مصنف الكتابة العربية",
      description: "دليل خطوة بخطوة لإتقان خط اليد العربية",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      store: true,
      price: 24.99,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/Frame 1000004932.png",
      tag: "مهارات التعليم والتدريس",
      title: "إتقان التدريس الفعال",
      description:
        "تعرف على المبادئ الأساسية والاستراتيجيات العملية لتصبح معلمًا واثقًا ومؤثرًا.",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      price: 95,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/dollars.png",
      tag: "مهارات التعليم والتدريس",
      title: "مصنف الكتابة العربية",
      description: "دليل خطوة بخطوة لإتقان خط اليد العربية",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      store: true,
      price: 24.99,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/Frame 1000004932.png",
      tag: "مهارات التعليم والتدريس",
      title: "إتقان التدريس الفعال",
      description:
        "تعرف على المبادئ الأساسية والاستراتيجيات العملية لتصبح معلمًا واثقًا ومؤثرًا.",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      price: 95,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/dollars.png",
      tag: "مهارات التعليم والتدريس",
      title: "مصنف الكتابة العربية",
      description: "دليل خطوة بخطوة لإتقان خط اليد العربية",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      store: true,
      price: 24.99,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/Frame 1000004932.png",
      tag: "مهارات التعليم والتدريس",
      title: "إتقان التدريس الفعال",
      description:
        "تعرف على المبادئ الأساسية والاستراتيجيات العملية لتصبح معلمًا واثقًا ومؤثرًا.",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      price: 95,
      onRemove: () => alert("Removed from cart!"),
    },
    {
      image: "/images/dollars.png",
      tag: "مهارات التعليم والتدريس",
      title: "مصنف الكتابة العربية",
      description: "دليل خطوة بخطوة لإتقان خط اليد العربية",
      badge: "طالبات",
      rating: 4.5,
      reviews: 32,
      lessons: 12,
      seats: 5,
      startDate: "15 فبراير 2024",
      teacher: "جون سميث",
      teacherImage: "/images/Image-24.png",
      quantity: 1,
      store: true,
      price: 24.99,
      onRemove: () => alert("Removed from cart!"),
    },
  ]);

  return (
    <div className="container mx-auto px-[64px]">
      <CourseTitle title="السلة"  breadcrumbs={[
            { title: "الرئيسية", link: "/" },
            { title: "السلة", link: "#" },

      ]} />
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div className="flex items-start justify-between gap-6 mb-[43px]">
          <div className="flex-1">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-[45px] inline-flex justify-between items-center">
                <div className="text-right justify-center">
                  <span className="text-text text-2xl font-medium">
                    عدد العناصر:{" "}
                  </span>
                  <span className="text-secondary text-2xl font-bold">{cartItems.length}</span>
                </div>
                <div
                  onClick={() => setCartItems([])}
                  className=" cursor-pointer text-right justify-center text-secondary text-2xl font-bold "
                >
                  حذف الكل
                </div>
              </div>
              <div className="flex flex-col gap">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    data={item}
                    onRemove={() =>
                      setCartItems((prev) => prev.filter((_, i) => i !== index))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <CardSummery  />
          </div>
        </div>
      ) : (
        <section className="flex items-center justify-center flex-col w-full mb-[97px]">
          <div className=" flex items-center justify-center ">
            <img
              className="w-[400px] h-[400px]"
              src="/images/CART 1.png"
              alt="empty cart"
            />
          </div>
          <div className="flex mb-[48px] items-center justify-center text-text-alt text-[32px] text-bold">
            عربة التسوق فارغة. استمر في التسوق للعثور على دورة!
          </div>
          <button 
            onClick={() => router.push('/store')}
            className="inline-flex items-center justify-center gap-2.5 px-20 py-6 relative bg-secondary rounded-[25px] hover:bg-secondary-dark transition-colors duration-200 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px]  font-bold text-white text-base tracking-[0] leading-[normal] ">
              العودة إلى المتجر
            </div>
          </button>
        </section>
      )}
    </div>
  );
};

export default CartPage;
