import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userName: {
      type: String,
      default: "Anonymous User",
    },
    userImage: {
      type: String,
      default: "https://i.pravatar.cc/40",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Blog Comment", commentSchema);
export default Comment;
