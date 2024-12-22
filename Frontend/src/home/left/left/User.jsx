import User2 from "./User2";
import Usergetall from "../../../context/Usergetall";
const User = () => {
  console.log("Hi from User");
  const [allusers, loading] = Usergetall();
  console.log(allusers);
  return (
    <div
      style={{
        maxHeight: "calc(83vh)",
        overflowY: "scroll", // Enables vertical scrolling
        scrollbarWidth: "none", // Hides the scrollbar for Firefox
        msOverflowStyle: "none", // Hides the scrollbar for Internet Explorer/Edge
      }}
      className="flex flex-col items-start p-4 bg-gray-800 text-white rounded-lg shadow-md scrollbar-hide"
    >
    {allusers.map((user,index)=>{
      return <User2 key={index} user={user} />
    })}
    
    </div>
  );
};

export default User;
