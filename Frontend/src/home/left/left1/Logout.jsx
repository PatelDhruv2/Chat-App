import React, { useState } from 'react';
import { TbLogout2 } from 'react-icons/tb';
import axios from 'axios';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3002/api/user/signout");
            localStorage.removeItem("messenger");
           
            setLoading(false);
            alert("Logged out successfully");
            navigate("/signin"); 
        
        } catch (e) {
            console.log("Error:", e);
            setLoading(false);
        }
    };

    return (
        <div className="border-black bg-gray-500 h-full w-[5%] text-white flex flex-col items-center justify-end">
            <button
                className="bg-red-600 px-1.5 py-2 rounded-lg mt-2 flex flex-col items-center justify-end mb-3 on hover:bg-red-500"
                onClick={handleLogout} // Attach the logout handler to the button click
                disabled={loading} // Disable button when loading
            >
                <TbLogout2 className="text-white h-6 w-6" />
            </button>
        </div>
    );
};

export default Logout;
