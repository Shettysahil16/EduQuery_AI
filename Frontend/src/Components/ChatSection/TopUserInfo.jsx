import React from 'react'
import userActiveImage from '../../assets/green_dot-modified.png'
const TopUserInfo = () => {
  return (
    <div className='bg-slate-900 h-16 w-full flex items-center gap-4 px-4 border-b-2 border-slate-600'>
        <div>
            <div className='h-12 w-12 bg-Septenary flex justify-center items-center rounded-full relative border'>
                <p className='text-2xl font-medium'>B</p>
                <div className='absolute right-1 top-0'>
                    <img src={userActiveImage} alt="image"  className='h-auto w-2'/>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='font-medium'>UserName</div>
            <div className='text-xs'>Online</div>
        </div>
    </div>
  )
}

export default TopUserInfo