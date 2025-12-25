import React from 'react'
import Card from './Card'

const HistoryCard = () => {

  const cards = Array.from({ length: 20 });

  return (
    <div className='flex flex-col gap-4 px-2'>
      <div className='border-2 rounded-md py-1 border-Primary text-center cursor-pointer mt-5 font-medium group text-2xl hover:bg-Primary hover:text-white transition-all'>
        <div className=''>New Chat</div>
      </div>
      <div className='text-5xl font-medium'>
        History
      <hr className='h-0.75 bg-Primary mt-4 rounded-full'/>
      </div>
      
      <div className='h-[calc(100vh-230px)] pr-2 overflow-y-auto scrollbar-custom'>
        <div className='flex flex-col gap-2 pb-4 min-h-[calc(100vh-230px)]'>
          {
            cards.map((_, index) => {
              return(
                <Card key={index}/>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default HistoryCard