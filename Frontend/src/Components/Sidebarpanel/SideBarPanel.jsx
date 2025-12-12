import React from "react";
import CloseSideBarIcon from "../../assets/icons/close_sidebarpanel_icon.svg?react";
import History from "../HistoryCard/HistoryCard";
import ExpertCard from "../ExpertCard/ExpertCard";

const SideBarPanel = ({setPanel, expertName}) => {

  return (
    <div className="hidden h-screen w-full md:w-[22vw] bg-Tertiary text-QuinaryText border-s-2 py-3 px-2 md:flex flex-col gap-4">
      <div className="w-fit ml-auto relative group cursor-pointer">
        <button className="rounded-sm cursor-pointer">
          <CloseSideBarIcon onClick={() => setPanel(false)} className="h-8 w-8 fill-Secondary" />
          <div className="w-28 hidden md:flex justify-center font-medium absolute z-10 right-10 top-1 bg-Primary text-PrimaryText text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Close sidebar
          </div>
        </button>
      </div>
      {
        expertName === "expert" && (
          <ExpertCard/>
        )
        
      }

      {
        expertName === "history" && (
          <History/>
        )
      }

    </div>
  );
};

export default SideBarPanel;


/*
<div className="py-4">
        <div className="text-4xl font-semibold">
          Experts
        <hr className="mt-2 border-t-3"/>
        </div>
        <div className="h-[calc(100vh-165px)] mt-4 flex flex-col gap-4 overflow-y-auto">
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>

          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
        </div>
      </div>
*/