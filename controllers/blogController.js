import Blog from "../models/blogmodel.js";
export const createBlog = async (req, res, next) => {
    try {
        const { title, content, createdAt, image, tags } = req.body;

        console.log("blog data",req.body)
        const blog = await Blog.create({
            title, content, createdAt, image, tags
        });
        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }

};
