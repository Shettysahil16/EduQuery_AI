import React, { useState } from "react";
import MenuIcon from "../../assets/icons/menu_icon.svg?react";
import MobileSideBar from "../MobileSideBar";
import { Link } from "react-router-dom";
const TopBar = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  return (
    <div className="h-12 w-full bg-Secondary px-1 md:px-2 flex gap-2 items-center text-3xl font-semibold text-PrimaryText">
      <div>
        <MenuIcon
          onClick={() => setIsSideBarVisible(true)}
          className="h-9 w-10 md:hidden"
        />
      </div>

      <Link to={"/"}>EduQuery AI</Link>

      <div
        className={`flex md:hidden fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isSideBarVisible ? "w-[50%]" : "w-0"
        }`}
      >
        <MobileSideBar closeSidebar={setIsSideBarVisible} />
      </div>
    </div>
  );
};

export default TopBar;
