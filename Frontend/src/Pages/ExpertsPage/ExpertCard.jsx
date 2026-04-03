import React from "react";
import { Link } from "react-router-dom";
import { expertImages } from "../../assets/experts";

const ExpertCard = ({tutor}) => {
  console.log("tutor", tutor);
  //console.log("expertImages", expertImages);
  
  
  
  return (
    <Link to={`/experts/${tutor.url}/${tutor.tutorId}`} className="group bg-Primary h-40 w-[80vw] md:h-40 md:w-[40vw] xl:h-60 xl:w-[40vw] 2xl:h-56 2xl:w-[30vw] rounded cursor-pointer">
      <div className="h-full w-full flex p-1">
        <div className=" w-[50%] flex justify-center items-center">
          <div className="h-48 w-48 rounded-full flex justify-center items-center overflow-hidden border-5 border-Tertiary">
            <img src={expertImages[tutor.avatar]} alt="maths expert" className="w-full h-full group-hover:scale-110 transition-all" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 px-2 mt-10">
          <div className="text-xl md:text-lg lg:text-xl xl:text-2xl font-medium capitalize">{tutor.name}</div>
          <div className="px-2 text-sm font-base">{tutor.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default ExpertCard;
