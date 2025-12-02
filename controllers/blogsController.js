import Blog from "../models/blogsModel.js";

// Get all blogs (with search, filter, pagination)
export const getBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 6 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: blogs,
      page: Number(page),
      totalPages,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      tags,
      image,
      authorName,
      authorEmail,
      authorImage,
      type,
    } = req.body;

    const newBlog = new Blog({
      title,
      content,
      category,
      tags,
      image,
      authorName,
      authorEmail,
      authorImage,
      type,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a blog post
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.likes = (blog.likes || 0) + 1;
    await blog.save();

    res.status(200).json({
      likes: blog.likes,
      message: "Blog liked successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

