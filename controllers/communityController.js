import CommunityMessage from "../models/communityModal.js";

export const getMessages = async (req, res) => {
    try {
        const messages = await CommunityMessage.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Post a new message
export const postMessage = async (req, res) => {
    try {
        const { senderId, senderName, text } = req.body;

        if (!senderId || !text) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newMessage = new CommunityMessage({ senderId, senderName, text });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
