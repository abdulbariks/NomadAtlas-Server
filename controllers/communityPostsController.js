import CommunityPost from "../models/CommunityPost.js";
export const getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    console.error("getAllPosts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("getPostById:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const {
      name,
      description,
      author,
      avatar,
      category,
      trending,
      nomadCount,
      fullStory,
      image,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "name and description are required" });
    }

    const post = new CommunityPost({
      name,
      description,
      fullStory: fullStory || "",
      author: author || "Anonymous",
      avatar: avatar || "",
      image: image || "",
      category: category || "General",
      trending: !!trending,
      nomadCount: Number(nomadCount) || 0,
      likes: 0,
      comments: [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("createPost:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.likes = (post.likes || 0) + 1;
    
    if (post.likes >= 10) post.trending = true;
    await post.save();

    const updated = await CommunityPost.findById(post._id).lean();
    res.json(updated);
  } catch (err) {
    console.error("likePost:", err);
    res.status(500).json({ message: "Failed to like post" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { author, text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Comment text required" });

    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ author: author || "Anonymous", text: text.trim(), createdAt: new Date() });
    await post.save();

    const newComment = post.comments[post.comments.length - 1];
    res.status(201).json(newComment);
  } catch (err) {
    console.error("addComment:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const addReply = async (req, res) => {
  try {
    const { author, text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Reply text required" });

    const { id: postId, commentId } = req.params;
    const post = await CommunityPost.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ author: author || "Anonymous", text: text.trim(), createdAt: new Date() });
    await post.save();

    const newReply = comment.replies[comment.replies.length - 1];
    res.status(201).json(newReply);
  } catch (err) {
    console.error("addReply:", err);
    res.status(500).json({ message: "Failed to add reply" });
  }
};
