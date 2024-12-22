import Search from "./search";
import User from "./user";
const Left = () => {
  return (
    <div className="w-[30%] border-r border-gray-300 bg-gray-900 h-full text-white flex flex-col">
      <h1 className="text-xl font-semibold p-4 border-b border-gray-700">Chats</h1>
      <div className="p-4">
        <Search />
        <hr className="mt-2"></hr>
        <User/>
      </div>
    </div>
  );
};

export default Left;
