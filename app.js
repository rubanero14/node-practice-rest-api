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
app.get("/comments", async (req, res, next) => {
  const response = await axios
    .get("https://jsonplaceholder.typicode.com/comments", {
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
    .get("https://jsonplaceholder.typicode.com/posts", {
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
           <li><kbd>GET All Comments</kbd> => <code>'/comments'</code> [method: <em>GET</em>]</li>
           <li><kbd>GET All Posts</kbd> => <code>'/posts'</code> [method: <em>GET</em>]</li>
           <li><kbd>GET Post with Specific ID</kbd> => <code>'/posts/:id'</code> [method: <em>GET</em>]</li>
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
