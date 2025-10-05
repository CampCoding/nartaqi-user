


import React from 'react'
import cx from '../../lib/cx'


const Container = ({children , className}) => {
  return (
    <div className={cx('lg:container mx-auto   px-4 xl:max-w-[1312px]' , className)}>
      {children}
    </div>
  )
}

export default Container
