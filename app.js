const PORT = process.env.PORT || 3000;
const path = require("path");
const Express = require("express");
const Cors = require("cors");
const axios = require("axios");

// Initiate Express
const app = Express();

// Initiate and use middlewares here
app.use(Express.urlencoded());
app.use(Express.json());

// Activate Cors and register to allow multiple CORS origin urls
app.use(
  Cors({ origin: ["http://localhost:3000", "https://rubanero14.github.io"] })
);

// GET: endpoint for get all comments
app.get("/top-posts", async (req, res, next) => {
  await axios
    .get("https://jsonplaceholder.typicode.com/comments", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((response) => {
      const posts = response.data;
      const postInfo = [];
      const postTitle = [];
      const postBody = [];
      let numberOfComments = 1;

      for (let i = 0; i <= posts.length; i++) {
        if (posts[i + 1].id === posts.length) {
          break;
        } else {
          if (posts[i].postId === posts[i + 1].postId) {
            postTitle.push(posts[i].name);
            postBody.push(posts[i].body);
            numberOfComments++;
          } else {
            postInfo.push({
              post_id: posts[i].postId,
              post_title: postTitle,
              post_body: postBody,
              total_number_of_comments: numberOfComments,
            });
            postTitle.splice(0, postTitle.length);
            postBody.splice(0, postBody.length);
            numberOfComments = 1;
          }
        }
      }
      res.send(postInfo);
    })
    .catch((err) => console.log(err));
});

// GET: endpoint for get all posts
app.get("/top-posts/:searchKeyword", async (req, res, next) => {
  await axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((response) => {
      const searchKeyword = req.params.searchKeyword;
      const posts = response.data;
      const postComments = [];
      let numberOfCommentsFound = 0;
      let data = "";
      for (const post of posts) {
        if (post["body"].includes(searchKeyword)) {
          postComments.push(post["body"]);
          numberOfCommentsFound++;
        }
        data = {
          comments_found_array: postComments,
          number_of_posts_found: numberOfCommentsFound,
        };
      }
      res.send(data);
    })
    .catch((err) => console.log(err));
});

// GET: endpoint for get all comments
app.get("/comments", async (req, res, next) => {
  const response = await axios
    .get(`https://jsonplaceholder.typicode.com/comments`, {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
});

// GET: endpoint for get all posts
app.get("/posts", async (req, res, next) => {
  const response = await axios
    .get(`https://jsonplaceholder.typicode.com/posts`, {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
});

// GET: endpoint for get post with specific ID
app.get("/posts/:id", async (req, res, next) => {
  const id = req.params.id;
  const response = await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
});

// HOME: Root Endpoint
app.get("/", async (req, res, next) => {
  // Example of Simple endpoint documentation
  res.send(`
       <h1>API Documentation<h1>
       <h3>List of Endpoints</h3>
       <ul>
           <li><kbd>GET Top Post</kbd> => <code><a href="/top-posts">'/top-posts'<a></code> [method: <em>GET</em>]</li>
           <li><kbd>Filter Comments</kbd> => <code><a href="/top-posts">'/top-posts/:searchKeyword'<a></code> [method: <em>GET</em>]</li>
           <li><kbd>GET All Comments</kbd> => <code><a href="/comments">'/comments'<a></code> [method: <em>GET</em>]</li>
           <li><kbd>GET All Posts</kbd> => <code><a href="/posts">'/posts'<a></code> [method: <em>GET</em>]</li>
           <li><kbd>GET Post with Specific ID</kbd> => <code><a href="/posts">'/posts/:id'<a></code> [method: <em>GET</em>]</li>
       </ul>
   `);
});

// Catch All middleware for other undefined middlewares under Not Found category
app.use((err, req, res, send) => {
  // respond page not found
  res.status(404).send("404: Page not found");
});

// Initiate Server
app.listen(PORT, () => {
  console.log(`Server is online on PORT: http://localhost:${PORT}`);
});
