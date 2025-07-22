import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoaderIcon className='animate-spin text-primary size-10' />
    </div>
  )
}

export default PageLoader
