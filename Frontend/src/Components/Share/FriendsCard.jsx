import React from "react";
import SelectedIcon from "../../assets/icons/tick-svgrepo-com.svg?react";

const FriendsCard = ({ friend, selectedIds }) => {
  //console.log("friend", friend);
  
  const isSelected = selectedIds.includes(friend._id);

  return (
    <div className="p-1 flex flex-col items-center">
      <div className="h-22 w-22 rounded-full bg-green-500 flex justify-center items-center cursor-pointer relative">
        <p className="text-4xl font-medium capitalize">{friend.fullName[0]}</p>
        <div className="absolute bottom-0 -right-1 bg-Primary p-1 rounded-full">
          {isSelected && (
            <div className="h-6 w-6 bg-blue-500 rounded-full flex justify-center items-center">
              <SelectedIcon className="h-4 w-auto stroke-white" />
            </div>
          )}
        </div>
      </div>
      <p>{friend.fullName}</p>
    </div>
  );
};

export default FriendsCard;
