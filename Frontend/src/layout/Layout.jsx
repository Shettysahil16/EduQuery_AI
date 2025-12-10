
import TopBar from "../Components/Topbar/TopBar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebar/SideBar";
import SideBarPanel from "../Components/Sidebarpanel/SideBarPanel";

export default function Layout() {
  return (
    <div className="h-screen flex w-full flex-col-reverse md:flex-row">
      
      <div className="flex">
        <SideBar/>
        <SideBarPanel/>
      </div>

      <div className="h-screen md:h-screen w-full flex flex-col justify-between relative">
        <TopBar />
        <Outlet />   
      </div>
    </div>
  );
}

/*
 
      <div className="flex">
        <Left/>
      </div>

      <div className="h-screen md:h-screen w-full flex flex-col justify-between relative">
        <TopBar />
        <Outlet />   
      </div>

*/