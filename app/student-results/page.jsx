

import React from 'react'
import PagesBanner from '../../components/ui/PagesBanner'
import { StudentResultCard } from '../../components/ui/Cards/StudentResultCard'

const StudentsResults = () => {
  return (
    <div>
       <PagesBanner
        variant="normal"
        title={"درجات الطلاب بالقدرات"}
        breadcrumb={[
          {
            title: "الرئيسية",
            link: "/",
          },
          {
            title: "درجات الطلاب",
            link: "#",
          },
        ]}
        image={"/images/students-results.png"}
      />



        <div className='grid grid-cols-3 container mx-auto max-w-[1312px] gap-y-[32px] mt-[32px] mb-[100px]'>
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />
        <StudentResultCard />

        </div>

    </div>
  )
}

export default StudentsResults
