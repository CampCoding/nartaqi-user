import React from 'react'
import VerificationCode from './VerificationCodeContent'

const page = () => {
  return (
    <Suspense fallback={null}>
      <VerificationCode />
    </Suspense>
  )
}

export default page
