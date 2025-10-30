import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    author: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    author: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
    replies: [ReplySchema],
  },
  { timestamps: true }
);

const CommunityPostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    fullStory: { type: String, default: "" }, 
    author: { type: String, default: "Anonymous" },
    avatar: { type: String, default: "" },
    image: { type: String, default: "" }, 
    category: { type: String, default: "General" },
    trending: { type: Boolean, default: false },
    nomadCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const CommunityPost = mongoose.model("CommunityPost", CommunityPostSchema);
export default CommunityPost;
