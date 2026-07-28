import Post from "../models/Posts.js";
import *as dotenv from "dotenv";
import {createError} from "../error.js";
import{v2 as cloudinary} from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all posts 

export const getAllPosts = async(req,res,next)=>
{
    try{
        const posts =await Post .find ({});
        return res.status(200).json({success:true,data:posts })
    }catch(error){
        next(createError(error.status,error?.response?.data?.error?.message||error?.message ));
    }
}

//create post 

export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;

    if (!name || !prompt || !photo) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, prompt and photo are required" 
      });
    }

    // Upload the photo sent from frontend (no re-generation)
    const uploaded = await cloudinary.uploader.upload(photo, {
      folder: "ai_posts",
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: uploaded.secure_url,
    });

    return res.status(201).json({ success: true, data: newPost });

  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({ success: false, message: "Failed to create post" });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Delete from Cloudinary
    if (post.photo) {
      // Extract public ID from Cloudinary URL
      const urlParts = post.photo.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];

      await cloudinary.uploader.destroy(`ai_posts/${publicId}`);
    }

    // Delete from MongoDB
    await Post.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Post and image deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    next(error);
  }
};