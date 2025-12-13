import React from "react";
import ExpertCard from "./ExpertCard";
import { useSideBarPanel } from '../../Context/SideBarPanel/useSideBarPanel';

const Experts = () => {
  const { isOpen } = useSideBarPanel();
  return (
    <div className="bg-Septenary h-full text-white relative">
      
      <div className="h-[calc(100vh-50px)] overflow-y-auto scrollbar-custom mr-1">
        <div className={`min-h-[calc(100vh-50px)] p-4 flex gap-4 flex-wrap justify-center ${isOpen ? "md:justify-center" : "md:justify-start"}`}>
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
      </div>
      </div>
    </div>
  );
};

export default Experts;
