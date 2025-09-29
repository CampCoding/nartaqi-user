import React from "react";

const CourseTitle = ({title}) => {
  return (
    <div className="container mx-auto px-[64px] my-[48px] flex items-center justify-center">
      <div className="inline-flex flex-col justify-start items-center gap-4">
        <div className="text-center justify-center text-tertiary text-[40px] font-bold leading-loose">
          {title || "إتقان التدريس الفعال - معلمين"}
        </div>
        <div className="px-6 py-4 bg-secondary rounded-2xl inline-flex justify-center items-center">
        <div className="justify-center text-text text-2xl font-bold  leading-normal">
            الرئيسية
          </div>
         
          <div className="w-6 h-6 relative  rotate-180 overflow-hidden">
            <div className="rotate-180">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6634 5.83816C15.7701 5.94465 15.8547 6.07115 15.9125 6.2104C15.9703 6.34966 16 6.49894 16 6.6497C16 6.80046 15.9703 6.94974 15.9125 7.08899C15.8547 7.22825 15.7701 7.35474 15.6634 7.46124L11.197 11.9276L15.6634 16.3939C15.8786 16.6092 15.9995 16.9011 15.9995 17.2055C15.9995 17.5099 15.8786 17.8018 15.6634 18.017C15.4481 18.2322 15.1562 18.3532 14.8518 18.3532C14.5474 18.3532 14.2555 18.2322 14.0403 18.017L8.75664 12.7334C8.64992 12.6269 8.56526 12.5004 8.5075 12.3611C8.44973 12.2219 8.42 12.0726 8.42 11.9218C8.42 11.7711 8.44973 11.6218 8.5075 11.4825C8.56526 11.3433 8.64992 11.2168 8.75664 11.1103L14.0403 5.82664C14.4777 5.38922 15.2144 5.38922 15.6634 5.83816Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </div>
          <div className="justify-center text-white text-2xl font-semibold ">
            دورات المعلمين
          </div>
          <div className="w-6 h-6 relative  rotate-180 overflow-hidden">
            <div className="rotate-180">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.6634 5.83816C15.7701 5.94465 15.8547 6.07115 15.9125 6.2104C15.9703 6.34966 16 6.49894 16 6.6497C16 6.80046 15.9703 6.94974 15.9125 7.08899C15.8547 7.22825 15.7701 7.35474 15.6634 7.46124L11.197 11.9276L15.6634 16.3939C15.8786 16.6092 15.9995 16.9011 15.9995 17.2055C15.9995 17.5099 15.8786 17.8018 15.6634 18.017C15.4481 18.2322 15.1562 18.3532 14.8518 18.3532C14.5474 18.3532 14.2555 18.2322 14.0403 18.017L8.75664 12.7334C8.64992 12.6269 8.56526 12.5004 8.5075 12.3611C8.44973 12.2219 8.42 12.0726 8.42 11.9218C8.42 11.7711 8.44973 11.6218 8.5075 11.4825C8.56526 11.3433 8.64992 11.2168 8.75664 11.1103L14.0403 5.82664C14.4777 5.38922 15.2144 5.38922 15.6634 5.83816Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </div>
          <div className="justify-center text-white text-2xl font-semibold ">
            مهارات التعليم والتدريس
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
