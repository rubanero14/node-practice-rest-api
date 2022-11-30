const axios = require("axios");

const Constants = require("../util");
const homeView = require("../view-components");
const errorView = require("../view-components/error");

exports.getTopPosts = async (req, res, next) => {
  try {
    const comments = await axios.get(`${Constants.BASE_URL}comments`, {
      headers: Constants.headerJsonConfig,
    });

    const posts = await axios.get(`${Constants.BASE_URL}posts`, {
      headers: Constants.headerJsonConfig,
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
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.getFilteredComment = async (req, res, next) => {
  try {
    await axios
      .get(`${Constants.BASE_URL}comments`, {
        headers: Constants.headerJsonConfig,
      })
      .then((response) => {
        const queryKey = Object.keys(req.query)[0];
        const queryValue = req.query[queryKey];

        const comments = response.data;
        const results = [];
        let numberOfCommentsFound = 0;
        let data = "";

        const filterComments = (key, value) => {
          for (const comment of comments) {
            if (key !== "postId" && key !== "id") {
              if (comment[key].toLowerCase().includes(value.toLowerCase())) {
                results.push({
                  postId: comment["postId"],
                  id: comment["id"],
                  name: comment["name"],
                  email: comment["email"],
                  comments: comment["body"],
                });
                numberOfCommentsFound++;
              }
            } else {
              if (comment[key] == value) {
                results.push({
                  postId: comment["postId"],
                  id: comment["id"],
                  name: comment["name"],
                  email: comment["email"],
                  comments: comment["body"],
                });
                numberOfCommentsFound++;
              }
            }

            if (key === undefined || value === undefined) {
              res.send(errorView);
            }

            data = {
              comments_found_array: results,
              number_of_comments_found: numberOfCommentsFound,
            };
          }
        };

        filterComments(queryKey, queryValue);

        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const response = await axios
      .get(`${Constants.BASE_URL}comments`, {
        headers: Constants.headerJsonConfig,
      })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    res.send(response);
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const response = await axios
      .get(`${Constants.BASE_URL}posts`, {
        headers: Constants.headerJsonConfig,
      })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    res.send(response);
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.getSpecificPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await axios
      .get(`${Constants.BASE_URL}posts/${id}`, {
        headers: Constants.headerJsonConfig,
      })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    res.send(response);
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.getDocumentation = async (req, res, next) => {
  try {
    // Example of simple endpoint documentation
    res.send(homeView);
  } catch (err) {
    res.status(503).send(err);
  }
};

exports.pageNotFound = (req, res) => {
  try {
    res.status(404).send("404: Page not found");
  } catch (err) {
    res.status(503).send(err);
  }
};
