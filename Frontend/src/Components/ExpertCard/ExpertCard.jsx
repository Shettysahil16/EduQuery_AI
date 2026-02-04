import React from 'react'
import Card from './Card'
import { experts } from '../../constants/experts';


const ExpertCard = () => {

  //const card = Array.from({length : 10});

  return (
    <div className='px-2'>
      <div className='text-5xl font-medium'>
        Experts
      </div>
      <hr className='h-0.75 bg-Primary mt-4 rounded-full'/>
      <div className='h-[calc(100vh-150px)] overflow-y-auto pr-2 scrollbar-custom'>
        <div className='min-h-[calc(100vh-150px)] py-4 pl-1 flex flex-col gap-4'>
        {
          experts.map((expert, index) => {
            return(
              <Card key={index} name={expert.Name} expertUrl={expert.expertUrl} path={expert.path}/>
            )
          })
        }
      </div>
      </div>
    </div>
  )
}

export default ExpertCard