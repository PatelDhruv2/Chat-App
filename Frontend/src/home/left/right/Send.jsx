const Send=()=>{
    return(
        <>
        <div className="mt-80" style={{minHeight:"calc(86vh-8vh"}}>
            <input placeholder="Write Message here...." className="w-[90%] bg-white text-black p-2"></input>
            <button className="justify-center items-center  bg-green-700 w-[10%] p-2 rounded-md on hover:bg-green-500">
                Send
            </button>
        </div>
        </>
    )
}
export default Send;