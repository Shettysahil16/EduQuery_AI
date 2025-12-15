import React from "react";
import Prompt from "../Components/Prompt";

const Home = () => {
  return (
    <div className="bg-Septenary h-full w-full p-4 text-white">
      <div className="h-full w-full md:max-w-[60%] mx-auto flex flex-col items-center">
        <div className="w-full h-full md:min-h-[40vh] flex justify-center items-center text-2xl md:text-3xl lg:text-5xl py-2">
          What are you working on?
        </div>
        <div className="w-full">
          <Prompt />
        </div>
        <div className="text-xs mt-1 text-center">EduQuery AI can make mistakes. Check important info</div>
      </div>
    </div>
  );
};

export default Home;
