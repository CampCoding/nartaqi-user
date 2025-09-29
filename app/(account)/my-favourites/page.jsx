

import React from 'react'
import CourseCard from './../../../components/ui/Cards/CourseCard';

const MyFavourites = () => {
  return (
    <div >
        <div className=" leading-normal self-stretch h-14 text-right  justify-center text-text text-2xl font-bold mb-[24px] ">
        المفضلة
      </div>


    <div className='grid grid-cols-3 gap-x-[13.5px] gap-y-[24px]'>

      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
      <CourseCard freeWidth={true} isRegistered={true} isInFav={true} />
    </div>















    </div>
  )
}

export default MyFavourites
