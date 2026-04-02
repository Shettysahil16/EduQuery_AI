import TopBar from "../Components/Topbar/TopBar";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sidebar/SideBar";
import SideBarPanel from "../Components/Sidebarpanel/SideBarPanel";
import { useEffect, useState } from "react";
import { useSideBarPanel } from "../Context/SideBarPanel/useSideBarPanel";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import GetStarted from "../Pages/GetStarted";
import { useAuth } from "../Context/Auth/useAuth";
import Loader from "../Components/Loaders/Loader";

export default function Layout() {
  const user = useSelector(selectUser);
  

  const [panelDetail, setPanelDetail] = useState(null);

  const { isOpen } = useSideBarPanel();

  const { loading, fetchAuthUserDetails } = useAuth();

  

  useEffect(() => {
    fetchAuthUserDetails();
  }, [fetchAuthUserDetails]);


  if (loading) {
    return <Loader />;
  }

  // 🚪 Not authenticated
  if (!user) {
    return <GetStarted />;
  }

  
  
  return (
    <>
      <div className="h-screen flex w-full flex-col-reverse md:flex-row">
        <div className="flex">
          <SideBar expertName={panelDetail} setPanelDetail={setPanelDetail} />
          <div
            className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "w-[22vw]" : "w-0"
            }`}
          >
            <SideBarPanel
              expertName={panelDetail}
              setPanelDetail={setPanelDetail}
            />
          </div>
        </div>

        <div className="h-screen md:h-screen w-full flex flex-col justify-between">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </>
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
