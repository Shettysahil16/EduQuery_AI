import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({name, expertUrl, path}) => {
  return (
    <Link to={`/experts/${expertUrl}`} className='h-32 w-full border-2 rounded flex items-center cursor-pointer transition-all hover:scale-102'>
      <div className='h-full w-[40%] flex justify-center items-center'>
        <div className='bg-green-500 h-24 w-24 rounded-full flex justify-center items-center overflow-hidden'>
          <img src={path} alt={`${name} image`} className='h-full w-full object-cover'/>
        </div>
      </div>
      <div className='h-full w-full flex items-center pr-1'>
        <div className='h-[90%] w-full pt-4 flex flex-col gap-1'>
          <p className='text-xl font-medium'>{name}</p>
          <p className='whitespace-break-spaces truncate text-sm'>Chat with a {name} expert powered by AI.</p>
        </div>
      </div>
    </Link>
  )
}

export default Card