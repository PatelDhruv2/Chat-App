import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // Extract message from request body
        const { id: receiverId } = req.params; // Extract receiver ID from URL params
        const senderId = req.user?._id; // Extract sender ID from req.user

        // Validate inputs
        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message content is required" });
        }
        if (!receiverId || !senderId) {
            return res.status(400).json({ message: "Invalid sender or receiver ID" });
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // Create a new conversation if it doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message, // Ensure this matches the schema field
        });

        // Add the message to the conversation
        conversation.messages.push(newMessage._id);

        // Save both the conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        console.log("Conversation:", conversation);
        console.log("New Message:", newMessage);

        // Send a response with the new message
        res.status(201).json({"Message sent successfully": newMessage });
    } catch (e) {
        console.error("Error in sendMessage:", e.message, e.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getMessage = async (req, res) => {
    try {
      // Extract chatUser (receiver) and senderId (from authenticated user)
      const { id: chatUser } = req.params;
      const senderId = req.user?._id;
  
      // Log sender and chat user IDs for debugging
      console.log("Sender ID:", senderId);
      console.log("Chat User ID:", chatUser);
  
      if (!senderId) {
        console.error("Unauthorized request. Sender ID is missing.");
        return res.status(401).json({ message: "Unauthorized. Sender ID is missing." });
      }
  
      // Find the conversation between the sender and chatUser
     const conversation = await Conversation.findOne({
        participants: { $in: [chatUser,senderId] },
        }).populate("messages");
  
      // Log the conversation object to check its structure
      console.log("Conversation:", conversation);
  
      if (!conversation) {
        return res.status(404).json({ message: "No conversation found" });
      }
  
      // Return the messages if the conversation is found
      res.status(200).json({ messages: conversation.messages });
    } catch (error) {
      // Log error stack trace for debugging
      console.error("Error in getMessage:", error.message, error.stack);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
