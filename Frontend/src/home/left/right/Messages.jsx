import Message from "./Message";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../../../Components/Loading";
const Messages = () => {
    const {messages,loading}=useGetMessage();
    console.log(messages);
    return (
        <>
        {loading?(<Loading/>):(messages.length>0 && messages.map((message)=>{
            return <Message key={message._id} message={message}/>
        }))}
        <div 
            style={{
                minHeight: "calc(85vh-8vh)", 
                overflowY: "scroll", 
                scrollbarWidth: "none", /* Firefox */
                msOverflowStyle: "none" /* IE and Edge */

            }}
            className="no-scrollbar"
        >
            {!loading && messages.length === 0 && <div className="text-center text-white">No messages found.</div>}
            
            
        </div>
        <style>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
        `}</style>
        </>
    );
};

export default Messages;
