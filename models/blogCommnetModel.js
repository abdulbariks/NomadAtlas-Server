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
      trim: true,
      default: "Anonymous User",
    },
    userImage: {
      type: String,
      default: "https://i.pravatar.cc/40",
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    versionKey: false, // Removes __v field
  }
);

// Use a clear and conventional model name
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
