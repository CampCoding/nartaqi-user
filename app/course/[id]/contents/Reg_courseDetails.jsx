import React from "react";
import RegCourseDetailsCard from "../../../../components/CourseDetailsPage/Reg_courseDetialsCard";
import RegCourseDetailsContent from "../../../../components/CourseDetailsPage/Reg_courseDetailsContent";
import LiveCard from "./../../../../components/ui/Cards/LiveCard";
import Container from "../../../../components/ui/Container";
import MobileCourseDetails from "../../../../components/CourseDetailsPage/MobileCourseDetails";
import CrouseFaqs from "../../../../components/CourseDetailsPage/CourseFaqs";
import ShareBottomDrawer from "../../../../components/shared/ShareBottomDrawer";
import { useSearchParams } from "next/navigation";
import VideoPlayer from "../../../../components/ui/Video";
import cx from "../../../../lib/cx";
import useIsLgUp from './../../../../hooks/useLgUp';

const Reg_courseDetails = ({ isDone }) => {
  const [selectedTab, setSelectedTab] = React.useState("sourses");
  const [openShareDrawer, setOpenShareDrawer] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const searchParams = useSearchParams();
  const watch = searchParams.get("watch");
  const isIlgUp = useIsLgUp();
  return (
    <>
     {
       !isIlgUp && (
       <div className="lg:hidden space-y-4">
       {!watch ? (
         <MobileCourseDetails
           isRegestered
           isInFavorites={isFavorited}
           onToggleFavorite={() => setIsFavorited(!isFavorited)}
           isShareOpen={openShareDrawer}
           onShare={() => setOpenShareDrawer(!openShareDrawer)}
         />
       ) : (
         <VideoPlayer defaultPlay={true} />
       )}
       <Container>
         <RegCourseDetailsContent onTabsChange={(e) => setSelectedTab(e)} />
         {selectedTab === "sourses" && <CrouseFaqs />}
       </Container>
     </div>)
     }
     { isIlgUp && <div className="hidden lg:block">
        { !watch ? <div className="w-full h-[611px] relative ">
          <img
            src="/images/Frame 1000004932.png"
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div> : <VideoPlayer defaultPlay={true} />}

        {/* course details content */}
        <Container className=" mt-[48px] mb-[139px] ">
          <div className=" flex gap-5  justify-between items-start">
            <div className="max-w-[762px] w-full ">
              <RegCourseDetailsContent
                onTabsChange={(e) => setSelectedTab(e)}
              />
            </div>
            <div className={cx("  space-y-6   " , watch ? "":" translate-y-[-441px]")}>
              <RegCourseDetailsCard
                onShare={() => setOpenShareDrawer(!openShareDrawer)}
                onToggleFavorite={() => setIsFavorited(!isFavorited)}
                isInFavorites={isFavorited}
                isDone={isDone}
              />
              <LiveCard />
            </div>
          </div>

          {selectedTab === "sourses" && <CrouseFaqs />}
        </Container>
      </div>}
      <ShareBottomDrawer
        open={openShareDrawer}
        onClose={() => setOpenShareDrawer(false)}
        title="share"
        url={"https://www.google.com"}
      />
    </>
  );
};

export default Reg_courseDetails;
