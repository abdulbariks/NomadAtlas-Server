import mongoose from "mongoose";

const communityMessageSchema = new mongoose.Schema({
    senderId: { type: String },
    senderName: { type: String },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CommunityMessage", communityMessageSchema);
