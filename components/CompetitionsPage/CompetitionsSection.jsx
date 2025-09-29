

import React from 'react'
import { DailyQuizSection } from '../ui/Cards/CompetitionCard'

const CompetitionsSection = () => {
  return (
    <main
      className="w-full flex items-center justify-center    min-h-[770px] relative overflow-hidden bg-[url('/images/competitions-section-background.png')] bg-cover bg-center"
    >

      <div className='container grid grid-cols-3 justify-items-center mx-auto max-w-[1312px]'>
      <DailyQuizSection />
      <DailyQuizSection />
      <DailyQuizSection />
      </div>


    </main>
  )
}

export default CompetitionsSection
