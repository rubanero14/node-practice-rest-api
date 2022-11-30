const express = require("express");

const router = express.Router();

const appController = require("../controller");

// GET: endpoint to get Top Posts and sorted ascendingly based on number of comments
router.get("/top-posts", appController.getTopPosts);

// GET: endpoint for search and filter logic based on comments content
router.get("/filtered-comments", appController.getFilteredComment);

// GET: endpoint for get all comments
router.get("/comments", appController.getAllComments);

// GET: endpoint for get all posts
router.get("/posts", appController.getAllPosts);

// GET: endpoint for get post with specific ID
router.get("/posts/:id", appController.getSpecificPost);

// DOCMUENTATION: Root Endpoint
router.get("/", appController.getDocumentation);

module.exports = router;
