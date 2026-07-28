import express from "express";
import Post from "../models/Posts.js";
import { createPost } from "../controllers/Posts.js";
import { v2 as cloudinary } from 'cloudinary';
import { getAllPosts } from "../controllers/Posts.js";
import { deletePost } from "../controllers/Posts.js";

const router = express.Router();
router.get("/",getAllPosts);
router.post("/",createPost);
router.delete("/:id", deletePost);

export default router;