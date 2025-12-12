import React from 'react'
import Card from './Card'

const ExpertCard = () => {
  return (
    <div>
      <div className='text-5xl font-medium'>
        Experts
      </div>
      <hr className='h-0.75 bg-Primary mt-4 rounded-full'/>
      <div className='h-[calc(100vh-150px)] overflow-y-auto pr-2 scrollbar-custom'>
        <div className='min-h-[calc(100vh-150px)] py-4 flex flex-col gap-4'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      </div>
    </div>
  )
}

export default ExpertCard