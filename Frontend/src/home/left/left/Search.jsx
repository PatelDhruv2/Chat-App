const Search = () => {
    return (
      <div className="flex justify-center p-4 bg-gray-800 rounded-md shadow-md max-w-sm py-1.5">
        <form action="" className="w-full max-w-md">
          <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-full px-4 py-0.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
            <input
              type="text"
              className="grow bg-transparent focus:outline-none text-white placeholder-gray-400"
              placeholder="Search for chats..."
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Search;
