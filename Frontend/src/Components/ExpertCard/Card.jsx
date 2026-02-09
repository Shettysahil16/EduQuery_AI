import React from 'react'
import { Link } from 'react-router-dom'
import { useSideBarPanel } from "../../Context/SideBarPanel/useSideBarPanel";

const Card = ({expert}) => {
  //console.log("experts", expert);
  const { closeSidebar } = useSideBarPanel();
  
  return (
    <Link onClick={closeSidebar} to={`/experts/${expert.expertUrl}/${expert.tutorId}`} className='h-32 w-full border-2 rounded flex items-center cursor-pointer transition-all hover:scale-102'>
      <div className='h-full w-[40%] flex justify-center items-center'>
        <div className='bg-green-500 h-24 w-24 rounded-full flex justify-center items-center overflow-hidden'>
          <img src={expert.path} alt={`${expert.name} image`} className='h-full w-full object-cover'/>
        </div>
      </div>
      <div className='h-full w-full flex items-center pr-1'>
        <div className='h-[90%] w-full pt-4 flex flex-col gap-1'>
          <p className='text-xl font-medium'>{expert.name}</p>
          <p className='whitespace-break-spaces truncate text-sm'>Chat with a {expert.name} expert powered by AI.</p>
        </div>
      </div>
    </Link>
  )
}

export default Card

///experts/${tutor.url}/${tutor.tutorId}