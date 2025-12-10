import React from 'react'

const Chat = () => {
  return (
    <div className='h-full flex flex-col gap-4 my-2'>
        <div className='w-[45%] ml-auto bg-red-500'>Right message</div>
        <div className='w-[45%] bg-yellow-500'>Left message</div>
    </div>
  )
}

export default Chat