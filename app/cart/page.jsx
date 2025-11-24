"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CourseTitle from "./../../components/CourseDetailsPage/CourseTitle";
import CartItem from "../../components/CartPage/CartItem";
import CardSummery from "../../components/CartPage/CardSummery";
import { MobileCartItem } from "../../components/CartPage/MobileCartItem";
import Container from "../../components/ui/Container";

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
    <Container className="">
      <CourseTitle
        title="السلة"
        breadcrumbs={[
          { title: "الرئيسية", link: "/" },
          { title: "السلة", link: "#" },
        ]}
      />
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div className="flex items-start justify-between gap-6 mb-[43px]">
          <div className="flex-1">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-auto py-2 md:h-[45px] inline-flex justify-between items-center">
                <div className="text-right">
                  <span className="text-text text-lg sm:text-xl md:text-2xl font-medium">
                    عدد العناصر:{" "}
                  </span>
                  <span className="text-secondary text-lg sm:text-xl md:text-2xl font-bold">
                    {cartItems.length}
                  </span>
                </div>

                <button
                  onClick={() => setCartItems([])}
                  className="cursor-pointer text-right text-secondary text-lg sm:text-xl md:text-2xl font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-secondary rounded-md transition-all duration-200"
                  aria-label="حذف كل العناصر من السلة"
                  type="button"
                >
                  حذف الكل
                </button>
              </div>

              <div className="flex flex-col gap-7 md:gap-2">
                {cartItems.map((item, index) => (
                  <div>
                    <div className="lg:hidden">
                      <MobileCartItem
                        key={index}
                        data={item}
                        onRemove={() =>
                          setCartItems((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      />
                    </div>

                    <div className="hidden lg:block">
                      <CartItem
                        key={index}
                        data={item}
                        onRemove={() =>
                          setCartItems((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
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
          <div className=" flex items-center justify-center ">
            <img
              className="  w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
              src="/images/CART 1.png"
              alt="empty cart"
            />
          </div>
          <div className="flex mb-[48px] items-center justify-center text-text-alt  text-xl text-center md:text-[32px] text-bold">
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
