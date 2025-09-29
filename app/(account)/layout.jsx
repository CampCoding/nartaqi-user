

import React from 'react'
import { ProfileSideBar } from '../../components/profile/ProfileSideBar'

const layout = ({children}) => {
  return (
    <div className='container mx-auto px-[64px] pt-8 min-h-screen mt-[32px] mb-[64px]'>
          <div className='grid grid-cols-[331px_auto] gap-6 '>
          <ProfileSideBar />
          {/* <div></div> */}
          {children}
          </div>


    </div>
  )
}

export default layout
