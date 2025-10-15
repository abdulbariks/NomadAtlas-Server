import mongoose from "mongoose";

//  Sub-schema for comments
const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // commenter’s name
    text: { type: String, required: true }, // comment text
    avatar: { type: String, default: "https://i.pravatar.cc/40" }, // small user image
    time: { type: Date, default: Date.now }, // comment timestamp
  },
  { _id: false } // no separate _id for subdocs (optional)
);

// Main blog schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    image: { type: String, required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    authorImage: { type: String, required: true },

    type: {
      type: String,
      enum: ["blog", "Article", "News"],
      default: "blog",
    },

    //  Likes & Comments
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true } // includes createdAt & updatedAt
);

// ✅ Export model
export default mongoose.model("Blog", blogSchema);
