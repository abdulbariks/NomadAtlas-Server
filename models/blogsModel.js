import mongoose from "mongoose";


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
  
  },
  { timestamps: true } // includes createdAt & updatedAt
);

// ✅ Export model
export default mongoose.model("Blog", blogSchema);
