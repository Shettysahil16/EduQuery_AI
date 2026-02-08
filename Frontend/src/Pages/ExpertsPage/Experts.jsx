import React from "react";
import ExpertCard from "./ExpertCard";
import { useSideBarPanel } from '../../Context/SideBarPanel/useSideBarPanel';
//import { experts } from "../../constants/experts";
import summaryApi from '../../common/index';
import { useEffect } from 'react';
import { useState } from "react";


//      console.log("experts", experts);

const Experts = () => {
  const { isOpen } = useSideBarPanel();
  const [loading, setLoading] = useState(false);
  const [experts, setExperts] = useState([]);
  const filteredExperts = experts.filter((expert) => expert.tutorId !== 'general');

  const fetchExperts = async() => {
      try {
        setLoading(true);
        const response = await fetch(summaryApi.getTutors.url,{
        method : summaryApi.getTutors.method,
        credentials : 'include',
        headers: {
            "content-type": "application/json",
          },
      })
  
      const data = await response.json();
      setExperts(data);
      setLoading(false);
      console.log("experts", experts);
      
      } catch (error) {
        console.log("error in fetching tutors", error);
      }
      finally{
        setLoading(false);
      }
      
    }
  
    useEffect(() => {
      fetchExperts();
    },[])
    
    useEffect(() => {
      console.log("useEffect",experts);
    },[experts])


    

  return (
    <div className="bg-Septenary h-full text-white relative">
      
      <div className="h-[calc(100vh-50px)] overflow-y-auto scrollbar-custom mr-1">
        <div className={`min-h-[calc(100vh-50px)] p-4 flex gap-8 flex-wrap justify-center ${isOpen ? "md:justify-center" : "md:justify-start"}`}>
        {
          filteredExperts.map((expert,index) => {
            return(
              <ExpertCard key={index} tutor={expert}/>
            )
          })
        }
      </div>
      </div>
    </div>
  );
};

export default Experts;
