

import React from 'react'
import { MyCertificateCard } from '../../../components/ui/Cards/MyCertificateCard'

const MyCertificates = () => {
  return (
    <div>
      <div className=" leading-normal self-stretch h-14 text-right justify-center text-text text-2xl font-bold ">شهاداتي</div>

    <div className='grid grid-cols-3 gap-y-[24px] '>

    <MyCertificateCard />
    <MyCertificateCard />
    <MyCertificateCard />
    <MyCertificateCard />
    <MyCertificateCard />
    <MyCertificateCard />




    </div>



    </div>
  )
}

export default MyCertificates
