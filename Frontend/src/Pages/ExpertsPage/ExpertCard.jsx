import React from "react";
import mathsExpertImage from '../../assets/maths.webp'

const ExpertCard = () => {
  return (
    <div className="group bg-Primary h-40 w-[80vw] md:h-40 md:w-[40vw] xl:h-60 xl:w-[40vw] 2xl:h-64 2xl:w-[30vw] rounded cursor-pointer">
      <div className="h-full w-full flex p-1">
        <div className=" w-[50%] flex justify-center items-center">
          <div className="h-48 w-48 rounded-full flex justify-center items-center overflow-hidden border-5 border-Tertiary">
            <img src={mathsExpertImage} alt="maths expert" className="w-full h-full group-hover:scale-110 transition-all" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 px-2 mt-10">
          <div className="text-5xl font-medium">Title</div>
          <div className="px-2">Description :- Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, minima?</div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
