import React from "react";
import ExpertCard from "./ExpertCard";
import { useSideBarPanel } from '../../Context/SideBarPanel/useSideBarPanel';
import { experts } from "../../constants/experts";



console.log("experts", experts);

const Experts = () => {
  const { isOpen } = useSideBarPanel();
  return (
    <div className="bg-Septenary h-full text-white relative">
      
      <div className="h-[calc(100vh-50px)] overflow-y-auto scrollbar-custom mr-1">
        <div className={`min-h-[calc(100vh-50px)] p-4 flex gap-8 flex-wrap justify-center ${isOpen ? "md:justify-center" : "md:justify-start"}`}>
        {
          experts.map((expert,index) => {
            return(
              <ExpertCard key={index} name={expert.Name} expertUrl={expert.expertUrl} path={expert.path}/>
            )
          })
        }
      </div>
      </div>
    </div>
  );
};

export default Experts;
