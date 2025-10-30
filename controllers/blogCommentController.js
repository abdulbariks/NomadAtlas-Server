import Blog from "../models/blogsModel.js";
import Comment from "../models/blogCommnetModel.js";

/**
 *  Add a new comment to a blog
 *  POST /api/comments/:blogId
 *  Public (or Protected if using auth)
 */
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userName, userImage, text } = req.body;

    // Validate input
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }

    // Check if the blog exists
    const blogExists = await Blog.exists({ _id: blogId });
    if (!blogExists) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Create and save new comment
    const newComment = await Comment.create({
      blogId,
      userName: userName?.trim() || "Anonymous User",
      userImage: userImage || "https://i.pravatar.cc/40",
      text: text.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Server error while adding comment" });
  }
};

/**
 * Get all comments for a specific blog
 * GET /api/comments/:blogId
 * Public
 */
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Server error while fetching comments" });
  }
};

/**
 * Delete a comment by ID
 * DELETE /api/comments/:id
 * Admin or Comment Owner
 */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Server error while deleting comment" });
  }
};
