import React from "react";

const Home = () => {
  return (
    <div className="bg-Septenary h-full w-full p-4 overflow-y-auto">
      <h1 className="text-2xl text-white font-semibold">Welcome 👋</h1>

      <p className="mt-2 text-gray-300">
        This is your dashboard home page.
      </p>
    </div>
  );
};

export default Home;


/*

import React from "react";
import SideBar from "../Components/Sidebar";
import SideBarPanel from "../Components/SidebarPanel";
import TopBar from "../Components/Topbar";
import MainContent from "../Components/MainContent";
import Left from "../Left/Left";
import Right from "../Right/Right";

const Home = () => {
  return (
    <div className="h-screen flex w-full flex-col-reverse md:flex-row">
      <div className="flex">
        <Left/>
      </div>
      <div className="h-screen md:h-screen w-full flex flex-col justify-between">
       <Right/>
      </div>
    </div>
  );
};

export default Home;

*/