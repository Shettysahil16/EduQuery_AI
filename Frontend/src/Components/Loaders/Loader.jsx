import React from 'react'
import Loading from '../../assets/loaders/loading.svg?react'

const Loader = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-slate-400/40'>
        <Loading className='h-auto w-[10vw]'/>
    </div>
  )
}

export default Loader