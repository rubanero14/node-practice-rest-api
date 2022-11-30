const axios = require("axios");

const util = require("../util");
const homeView = require("../view-components");
const errorView = require("../view-components/error");

exports.getTopPosts = async (req, res, next) => {
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
};

exports.getFilteredComment = async (req, res, next) => {
  await axios
    .get(`${util.BASE_URL}comments`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => {
      const queryKey = Object.keys(req.query)[0];
      const queryValue = req.query[queryKey];
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

          if (key === undefined || value === undefined) {
            res.send(errorView);
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
};

exports.getAllComments = async (req, res, next) => {
  const response = await axios
    .get(`${util.BASE_URL}comments`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
};

exports.getAllPosts = async (req, res, next) => {
  const response = await axios
    .get(`${util.BASE_URL}posts`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
};

exports.getSpecificPost = async (req, res, next) => {
  const id = req.params.id;
  const response = await axios
    .get(`${util.BASE_URL}posts/${id}`, {
      headers: util.headerJsonConfig,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  res.send(response);
};

exports.getDocumentation = async (req, res, next) => {
  // Example of simple endpoint documentation
  res.send(homeView);
};

exports.pageNotFound = (req, res) => {
  res.status(404).send("404: Page not found");
};
