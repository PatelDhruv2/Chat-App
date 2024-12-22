import React from 'react';
import Chat from './Chat';
import Send from './Send';
import Messages from './Messages';
const Right=  ()=>{
    return (
        <div className="border-black  bg-gray-800 h-full w-[70%] text-white flex flex-col">
           <Chat/>
           <div  style={{
                maxHeight: "calc(85vh-8vh)", 
                overflowY: "scroll", 
                scrollbarWidth: "none", /* Firefox */
                msOverflowStyle: "none" /* IE and Edge */

            }}
            className="no-scrollbar">
           <Messages/>
           </div>
           <Send/>
        </div>
    )
}
export default Right;