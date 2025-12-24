import React from "react";

const FriendsCard = ({ loading, friend }) => {
  return (
    <>
      {loading ? (
        <div className="bg-slate-200 shrink-0 h-38 w-full flex gap-4 rounded p-2 animate-pulse">
          <div className="flex items-center justify-center">
            <div className="h-26 w-25 rounded-full flex justify-center items-center overflow-hidden bg-slate-300">
              
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 text-QuinaryText group-hover:text-white mt-6">
            <p className="bg-slate-300 py-3 w-full rounded-full"></p>
            <p className="bg-slate-300 py-2 w-20 rounded-full"></p>
          </div>
        </div>
      ) : (
        <div className="h-38 shrink-0 w-full flex gap-4 rounded p-2 transition-all duration-100 group hover:bg-Nonary cursor-pointer">
          <div className="flex items-center justify-center">
            <div className="h-26 w-25 rounded-full flex justify-center items-center overflow-hidden border-3 border-Primary group-hover:border-white">
              <p className="text-4xl font-semibold text-QuinaryText group-hover:text-white capitalize">
                {friend?.fullName?.charAt(0)}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-QuinaryText group-hover:text-white mt-6">
            <p className="text-2xl font-medium">{friend?.fullName}</p>
            <p className="text-base">online</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsCard;
