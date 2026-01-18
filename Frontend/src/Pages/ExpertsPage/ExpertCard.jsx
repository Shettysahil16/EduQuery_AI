import React from "react";
import mathsExpertImage from '../../assets/maths.webp'
import { Link } from "react-router-dom";

const ExpertCard = ({name, expertUrl, path}) => {
  console.log("expert inside expert card", name, path);
  
  return (
    <Link to={`/experts/${expertUrl}`} className="group bg-Primary h-40 w-[80vw] md:h-40 md:w-[40vw] xl:h-60 xl:w-[40vw] 2xl:h-56 2xl:w-[30vw] rounded cursor-pointer">
      <div className="h-full w-full flex p-1">
        <div className=" w-[50%] flex justify-center items-center">
          <div className="h-48 w-48 rounded-full flex justify-center items-center overflow-hidden border-5 border-Tertiary">
            <img src={path} alt="maths expert" className="w-full h-full group-hover:scale-110 transition-all" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 px-2 mt-10">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium capitalize">{name}</div>
          <div className="px-2">Description :- Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, minima?</div>
        </div>
      </div>
    </Link>
  );
};

export default ExpertCard;
