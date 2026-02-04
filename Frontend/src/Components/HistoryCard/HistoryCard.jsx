import React, { useEffect, useState } from 'react'
import Card from './Card'
import summaryApi from '../../common';

const HistoryCard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const cards = Array.from({ length: 20 });

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
  },[])
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
            history.map((cards, index) => {
              return(
                <Card key={index} cards={cards}/>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default HistoryCard