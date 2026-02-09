import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete-svgrepo-com.svg?react";
import summaryApi from "../../common";
import { toast } from "react-toastify";

const Card = ({ cards, onDelete }) => {
  //console.log("card", cards._id);
  const navigate = useNavigate();

  const handleDeleteConversation = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!window.confirm("Delete this conversation?")) return;

    try {
      const response = await fetch(summaryApi.deleteConversation.url, {
        method: summaryApi.deleteConversation.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ conversationId: cards._id }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        onDelete(cards._id);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete conversation");
      console.error(error);
    }
  };

  return (
    <div className="h-12 w-full border-2 rounded cursor-pointer flex items-center group">
      <Link
        to={`chats/${cards._id}`}
        className="h-full w-full flex items-center truncate"
      >
        <div className="bg-Nonary h-full w-[25%] shrink-0 flex justify-center items-center">
          <div className="text-sm  text-white font-medium px-1 truncate">
            {cards?.historyName}
          </div>
        </div>
        <div className="text-md truncate px-1 font-semibold">
          {" "}
          {cards?.title}{" "}
        </div>
      </Link>
      <div className="opacity-0 group-hover:opacity-100 text-sm ml-auto pr-1">
        <DeleteIcon
          onClick={handleDeleteConversation}
          className="h-5 w-auto stroke-Primary hover:stroke-red-500"
        />
      </div>
    </div>
  );
};

export default Card;
