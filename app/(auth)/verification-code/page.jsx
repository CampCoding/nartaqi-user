import React, { Suspense } from 'react'
import VerificationCode from './VerificationCodeContent'
export const dynamic = "force-dynamic"; // منع SSG لهذه الصفحة

const page = () => {
  return (
    <Suspense fallback={null}>
      <VerificationCode />
    </Suspense>
  )
}

export default page
