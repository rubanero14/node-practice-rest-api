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
  const comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments",
    {
      headers: {
        "Accept-Encoding": "application/json",
      },
    }
  );

  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts", {
    headers: {
      "Accept-Encoding": "application/json",
    },
  });

  const topPost = [];
  let numberOfComments = 0;

  posts.data.map((post) => {
    comments.data.map((comment) => {
      if (post.id === comment.postId) {
        numberOfComments++;
        topPost.push({
          post_id: post.id,
          post_title: post.title,
          post_body: post.body,
          total_number_of_comments: numberOfComments,
        });
      } else {
        numberOfComments = 0;
      }
    });
  });

  const sortedPost = topPost.sort(
    (a, b) =>
      parseFloat(b.total_number_of_comments) -
      parseFloat(a.total_number_of_comments)
  );

  res.send(sortedPost);
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
       <style>
        a {
          text-decoration: none;
        }
        button {
          border-radius: 4px;
        }
       </style>
       <h1>API Documentation<h1>
       <h3>List of Endpoints</h3>
       <ul>
           <li><kbd>GET Top Post</kbd> => <button><a target="_blank" href="/top-posts">/top-posts<a></button> [method: <em>GET</em>]</li>
           <br/>
           <li><kbd>Filter Comments</kbd> => <button><a target="_blank" href="/top-posts">/top-posts/:searchKeyword<a></button> <samp>where :searchKeyword type is string</samp> [method: <em>GET</em>]</li>
           <br/>
           <li><kbd>GET All Comments</kbd> => <button><a target="_blank" href="/comments">/comments<a></button> [method: <em>GET</em>]</li>
           <br/>
           <li><kbd>GET All Posts</kbd> => <button><a target="_blank" href="/posts">/posts<a></button> [method: <em>GET</em>]</li>
           <br/>
           <li><kbd>GET Post with Specific ID</kbd> => <button><a target="_blank" href="/posts">/posts/:id<a></button> <samp>where :id type is int</samp> [method: <em>GET</em>]</li>
       </ul>
       <button><a target="_blank" href="https://github.com/rubanero14/node-practice-rest-api">Source Code<a></button>
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
