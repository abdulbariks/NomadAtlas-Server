import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
 
  
} from "../controllers/blogsController.js";

const router = express.Router();

//  Blog CRUD routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

// Like and Comment routes
router.post("/:id/like", likeBlog);


export default router;
