import React from "react";
import  useConversations  from "../../../statemanage/useConversation.js";

const User2 = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversations();
  const isSelected = selectedConversation?._id === user?._id;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-emerald-600" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex w-full p-4 mb-3 rounded-lg hover:bg-gray-600 cursor-pointer transition-all">
        <div className="avatar flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="ml-4">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default User2;
