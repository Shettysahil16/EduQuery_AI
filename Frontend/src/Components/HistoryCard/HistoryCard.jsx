import React, { useEffect, useState } from 'react'
import Card from './Card'
import summaryApi from '../../common';
import { selectNewConversationCounter } from '../../store/newConversation';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HistoryCard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const cards = Array.from({ length: 20 });

  const newConversationCounter = useSelector(selectNewConversationCounter);

  const fetchChatHistory = async() => {
    
    try {
      setLoading(true);
      const response = await fetch(summaryApi.chatHistory.url,{
        method : summaryApi.chatHistory.method,
        credentials : 'include',
        headers: {
          "content-type": "application/json",
        },
      })

      const result = await response.json();
      //console.log("data of chat history", result);
      if(result.success){
        setHistory(result.data);
        setLoading(false);
      }
      
    } catch (error) {
      console.log("error in fetching chat history inside historyCard", error); 
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChatHistory();
  },[newConversationCounter])
  return (
    <div className='flex flex-col gap-4 px-2'>
      <Link to={'/'} className='border-2 rounded-md py-1 border-Primary text-center cursor-pointer mt-5 font-medium group text-2xl hover:bg-Primary hover:text-white transition-all'>
        <div className=''>New Chat</div>
      </Link>
      <div className='text-5xl font-medium'>
        History
      <hr className='h-0.75 bg-Primary mt-4 rounded-full'/>
      </div>
      
      <div className='h-[calc(100vh-230px)] pr-2 overflow-y-auto scrollbar-custom'>
        <div className='flex flex-col gap-2 pb-4 min-h-[calc(100vh-230px)]'>
          {
            history.map((cards) => {
              return(
                <Card key={cards._id} cards={cards} onDelete={(id) => setHistory((prev) => prev.filter((c) => c._id !== id))} newConversationCounter={newConversationCounter}/>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default HistoryCard