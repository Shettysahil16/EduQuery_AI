import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({cards}) => {
  //console.log("card", cards._id);
  
  return (
    <Link to={`chats/${cards._id}`} className='h-12 w-full border-2 rounded cursor-pointer flex items-center'>
      <div className='bg-Nonary h-full w-[25%] shrink-0 flex justify-center items-center'>
        <div className='text-sm  text-white font-medium px-1 truncate'>
          {cards?.historyName}
        </div>
      </div>
      <div className='text-sm truncate px-1'> {cards?.title} </div>
    </Link>
  )
}

export default Card
