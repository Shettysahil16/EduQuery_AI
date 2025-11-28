import React from "react";
import SideBar from "../Components/Sidebar";
import SideBarPanel from "../Components/SidebarPanel";
import TopBar from "../Components/Topbar";
import MainContent from "../Components/MainContent";

const Home = () => {
  return (
    <div className="h-screen flex w-full flex-col-reverse md:flex-row">
      <div className="flex w-full md:w-1/4 shrink-0">
        <SideBar/>
        <SideBarPanel/>
      </div>
      <div className="h-full md:h-screen w-full md:w-3/4 flex flex-col justify-between">
        <TopBar/>
        <MainContent/>
      </div>
    </div>
  );
};

export default Home;
