import Comment from "../models/blogCommnet.js";
import Blog from "../models/blogs.js";

// ✅ Add new comment
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userName, userImage, text } = req.body;

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Create comment
    const comment = await Comment.create({
      blogId,
      userName,
      userImage,
      text,
    });

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all comments for a specific blog
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete comment (optional)
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
