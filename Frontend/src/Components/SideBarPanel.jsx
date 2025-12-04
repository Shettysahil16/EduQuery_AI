import React from "react";
import closeSideBarIcon from "../assets/icons/archive-up-minimlistic-svgrepo-com.svg";

const SideBarPanel = () => {
  return (
    <div className="hidden md:block h-screen w-full bg-Tertiary text-QuinaryText border-s-2">
      <div className="p-3">
                <button className="relative group w-fit block ml-auto rounded-sm cursor-pointer">
                  <img
                    src={closeSideBarIcon}
                    alt="icon"
                    className="w-6 md:w-8 h-auto object-contain "
                  />
                  <div className="w-24 text-center hidden md:flex font-medium absolute -left-10 -bottom-11 bg-Primary text-PrimaryText text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Close sidebar
                  </div>
                </button>
              </div>
    </div>
  );
};

export default SideBarPanel;
