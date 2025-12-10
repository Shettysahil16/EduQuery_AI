import React from "react";
import CloseSideBarIcon from "../../assets/icons/archive-up-minimlistic-svgrepo-com.svg?react";

const SideBarPanel = () => {
  return (
    <div className="hidden h-screen w-full md:w-[22vw] bg-Tertiary text-QuinaryText border-s-2 py-3 px-2 md:flex flex-col gap-4">
      <div className="w-fit ml-auto relative group">
        <button className="rounded-sm cursor-pointer">
          <CloseSideBarIcon className="h-8 w-8 fill-Secondary" />
          <div className="w-24 hidden md:flex justify-center font-medium absolute z-10 -right-8 -bottom-11 bg-Primary text-PrimaryText text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Close sidebar
          </div>
        </button>
      </div>
      SideBarPanel
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