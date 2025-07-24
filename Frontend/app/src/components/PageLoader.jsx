import React from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { useThemeStore } from '../store/useThemeStore.js';

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
      <LoaderIcon className='animate-spin text-primary size-10' />
    </div>
  )
}

export default PageLoader
