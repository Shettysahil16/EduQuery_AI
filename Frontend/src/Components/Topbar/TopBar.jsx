import React, { useState } from "react";
import MenuIcon from "../../assets/icons/menu_icon.svg?react";
import MobileSideBar from "../MobileSideBar";
import { Link, useParams } from "react-router-dom";
import DownloadPdfIcon from "../../assets/icons/download-file-svgrepo-com.svg?react";

import summaryApi from "../../common";
const TopBar = () => {
  const { conversationId } = useParams();
  

  const downloadPdf = async () => {
    const response = await fetch(`${summaryApi.getChatPdf.url}/${conversationId}`, {
      method: summaryApi.getChatPdf.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation-${conversationId}.pdf`;
    a.click();
  };

  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  return (
    <div className="h-12 w-full bg-Secondary px-1 md:px-2 flex gap-2 items-center text-3xl font-semibold text-PrimaryText">
      <div>
        <MenuIcon
          onClick={() => setIsSideBarVisible(true)}
          className="h-9 w-10 md:hidden"
        />
      </div>

      <div className="w-full flex justify-between items-center">
        <Link to={"/"}>EduQuery AI</Link>
        <div className="relative">
          <div onClick={downloadPdf} className="w-fit p-2 rounded-full bg-Primary mr-20 cursor-pointer group relative">
            <DownloadPdfIcon className="stroke-white h-7 w-auto group-hover:scale-110 transition-transform" />

            <div className="absolute -right-15 -bottom-10 bg-Primary px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center whitespace-nowrap pointer-events-none">
              <p className="text-PrimaryText text-sm">Download section PDF</p>
            </div>
          </div>
        </div>
      </div>

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
