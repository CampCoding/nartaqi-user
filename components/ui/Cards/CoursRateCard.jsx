import { EmptyRatingStar, FullStarIcon, RatingStarIcon } from "../../../public/svgs";


export const CoursRateCard = () => {
  return (
    <div className="flex flex-col items-start gap-6 px-12 py-8 relative bg-primary-bg rounded-[30px] border-[3px] border-solid border-variable-collection-stroke">
      <div className="flex items-start justify-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-12 h-12 rounded-3xl bg-[url(/images/Image-48.png)] bg-cover bg-[50%_50%]" />
        <div className="flex flex-col items-start gap-1 relative flex-1 grow">
          <div className="relative self-stretch mt-[-1.00px]  text-text-duplicate text-base leading-6 ">
            مايكل براون
          </div>
          <div className=" text-sm leading-5 relative self-stretch text-[color:var(--variable-collection-sup-title-duplicate)] ">
            طالب
          </div>
        </div>
      </div>
      <div
      dir="ltr"
        className="relative self-stretch w-full flex items-center justify-end gap-1"
      >
        {
          [true , true , true , true , false].map((item, index) => {
            return (
              <div key={index}>
                {item ? <FullStarIcon /> : <EmptyRatingStar />}
              </div>
            )
          })
        }

      </div>
      <p className=" text-base leading-6 relative self-stretch text-[color:var(--variable-collection-sup-title-duplicate)] ">
        لوريم إيبسوم دولور سيت آميت، كونسيكتيتور أديبيسينغ إيليت. كورابيتور
        إيجيت إيروس فيتاي أورنا فيرمنتوم فاسيليسيس. سيد تريستيكوي، نيسل إن
        كورسوس تينسيدونت، جوستو لوريم فولوتبات سيم، فيل فيفيرا سابين آركو إت
        أورنا.
      </p>
    </div>
  );
};