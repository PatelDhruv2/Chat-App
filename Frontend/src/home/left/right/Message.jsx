const Message=({message})=>{
    const authUser=JSON.parse(localStorage.getItem("messenger"));
    const itsme=authUser._id===message.senderId;
    const chatName=itsme?"chat-end":"chat-start";
    const chatColor=itsme?"chat-bubble chat-bubble-sender bg-blue-400":"chat-bubble chat-bubble-receiver";
    return (
        <>
        <div>
        
           
            <div className={`chat ${chatName}`} >
                <div className={`chat-bubble text-white ${chatColor}`} >
                    {message.message}
                </div>
            </div>
        </div>
        </>
    )
}
export default Message;