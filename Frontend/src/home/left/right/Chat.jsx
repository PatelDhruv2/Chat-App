const Chat = () => {
    return (
        <>
           <div className="flex on hover:bg-gray-500 p-2  bg-gray-700">
           <div>
                <div className="avatar">
                    <div className="w-14 ">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="rounded-full" />
                    </div>
                </div>

            </div>
            <div className="ml-3 justify-center">
            <h1 className="font-bold text-xl">
                Patel Dhruv
            </h1>
            <span className="text-sm">Offline</span>
            </div>
           </div>
        </>
    )
}
export default Chat;