import TopBar from "../Components/Topbar/TopBar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebar/SideBar";
import SideBarPanel from "../Components/Sidebarpanel/SideBarPanel";
import { useState } from "react";
import { useSideBarPanel } from '../Context/SideBarPanel/useSideBarPanel';

export default function Layout() {
  const [panelDetail, setPanelDetail] = useState(null);

  const { isOpen } = useSideBarPanel();

  

  return (
    <div className="h-screen flex w-full flex-col-reverse md:flex-row">
      <div className="flex">
        <SideBar expertName={panelDetail} setPanelDetail={setPanelDetail} />
        <div
          className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-[22vw]" : "w-0"}`}
        >
          <SideBarPanel expertName={panelDetail} setPanelDetail={setPanelDetail}/>
        </div>
      </div>

      <div className="h-screen md:h-screen w-full flex flex-col justify-between">
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
