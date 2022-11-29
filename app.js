const PORT = process.env.PORT || 3000;
const Express = require("express");
const Cors = require("cors");
const axios = require("axios");
const util = require("./util");

// Initiate Express
const app = Express();

// Initiate and use middlewares here
app.use(Express.urlencoded());
app.use(Express.json());

// Activate Cors and register to allow multiple CORS origin urls
app.use(Cors({ origin: [util.DEV_ORIGIN, util.PROD_ORIGIN] }));

// GET: endpoint to get Top Posts and sorted ascendingly based on number of comments
app.get("/top-posts", async (req, res, next) => {
  const comments = await axios.get(`${util.BASE_URL}comments`, {
    headers: util.headerJsonConfig,
  });

  const posts = await axios.get(`${util.BASE_URL}posts`, {
    headers: util.headerJsonConfig,
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

// GET: endpoint for search and filter logic based on comments content
app.get("/comments", async (req, res, next) => {
  await axios
    .get(`${util.BASE_URL}comments`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => {
      const queryKey = Object.keys(req.query)[0];
      const queryValue = req.query[queryKey];
      console.log(queryKey, queryValue);
      const body = req.query.body;

      const comments = response.data;
      const results = [];
      let numberOfCommentsFound = 0;
      let data = "";

      const filterComments = (key, value) => {
        for (const comment of comments) {
          if (body) {
            if (comment["body"].includes(body)) {
              results.push(comment["body"]);
              numberOfCommentsFound++;
            }
          }

          if (value) {
            if (comment[key] == value) {
              results.push(comment["body"]);
              numberOfCommentsFound++;
            }
          }

          data = {
            comments_found_array: results,
            number_of_posts_found: numberOfCommentsFound,
          };
        }
      };

      filterComments(queryKey, queryValue);

      res.send(data);
    })
    .catch((err) => console.log(err));
});

// GET: endpoint for get all comments
app.get("/comments", async (req, res, next) => {
  const response = await axios
    .get(`${util.BASE_URL}comments`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
});

// GET: endpoint for get all posts
app.get("/posts", async (req, res, next) => {
  const response = await axios
    .get(`${util.BASE_URL}posts`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
});

// GET: endpoint for get post with specific ID
app.get("/posts/:id", async (req, res, next) => {
  const id = req.params.id;
  const response = await axios
    .get(`${util.BASE_URL}posts/${id}`, {
      headers: util.headerJsonConfig,
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
           <li><kbd>Search Filter Comments</kbd> => <button><a target="_blank" href="/top-posts">/top-posts/:searchKeyword<a></button> <samp>where :searchKeyword type is string</samp> [method: <em>GET</em>]</li>
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
