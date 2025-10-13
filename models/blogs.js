import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },           // Blog title
  content: { type: String, required: true },         // Blog main text/content
  category: { type: String, required: true },        // Category name
  tags: [String],                                    // Array of tags
  image: { type: String, required: true },           // Image URL (from imgbb or other)
  authorName: { type: String, required: true },      // Author’s display name
  authorEmail: { type: String, required: true },     // Author’s email (useful for filtering)
  authorImage:{type: String, required: true},
  type: {                                            // Publish status
    type: String,
    enum: ["blog", "Article", "News"],
    default: "blog"
  },
  createdAt: { type: Date, default: Date.now },      // Auto timestamp
});

export default mongoose.model("Blog", blogSchema);
