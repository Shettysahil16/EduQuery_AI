import React from 'react'
import Loader from '../../assets/loaders/chats_loading.svg?react'

const MessageLoader = () => {
  return (
    <div className='asbolute h-full w-full flex justify-center items-center'>
        <Loader/>
    </div>
  )
}

export default MessageLoader