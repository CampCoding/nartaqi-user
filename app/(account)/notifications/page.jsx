import React from "react";
import { NotificationIcon } from "../../../public/svgs";

const Notifications = () => {
  return (
    <div>
      <div className=" leading-normal self-stretch h-14 text-right  justify-center text-text text-2xl font-bold mb-[48px] ">
        الإشعارات
      </div>

      <div className="flex flex-col gap-3 w-full">
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
      </div>
    </div>
  );
};

export default Notifications;

export const NotificationRow = () => {
  return (
    <div className="flex items-start gap-2 justify-between px-0 py-4 relative border-b [border-bottom-style:solid] border-variable-collection-stroke">
      <NotificationIcon />

      <div className=" !leading-loose flex flex-col gap-2 items-end  w-[507px]  relative">
        <div className=" !leading-loose  text-black text-sm sm:text-base font-normal ">
          تمت الموافقة على طلب سحب جديد بقيمة 500 ر.س.
        </div>{" "}
        <div className=" !leading-loose text-text-alt text-xs sm:text-sm font-normal ">
          منذ 10 دقائق
        </div>{" "}
      </div>
    </div>
  );
};
