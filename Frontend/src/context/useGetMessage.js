import axios from "axios";
import { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation";
import cookies from "js-cookie";  // Make sure you import cookies here!

const useGetMessage = () => {
    const [loading, setLoading] = useState(true);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);

            if (!selectedConversation || !selectedConversation._id) {
                console.log("No conversation selected.");
                setLoading(false);
                return;
            }

            try {
                // Add token from localStorage or cookies
                const token = localStorage.getItem("messenger") || cookies.get("jwt"); // Ensure cookies are being imported
                if (!token) {
                    console.error("No token found. Please ensure the user is authenticated.");
                    setLoading(false);
                    return;
                }

                console.log("Fetching messages for conversation ID:", selectedConversation._id);

                const response = await axios.get(
                    `http://localhost:3002/api/message/get/${selectedConversation._id}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in headers
                        },
                    }
                );

                if (response.status === 200 && response.data?.messages) {
                    setMessages(response.data.messages); // Ensure proper extraction
                    console.log("Messages fetched successfully:", response.data.messages);
                } else {
                    console.log("No messages found or response status not 200:", response.data);
                }
            } catch (e) {
                console.error("Error fetching messages:", e.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    return {
        messages,
        loading,
    };
};

export default useGetMessage;
