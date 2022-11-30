const PORT = process.env.PORT || 3000;
const Express = require("express");
const Cors = require("cors");

const routes = require("./router");
const util = require("./util");

// Initiate Express
const app = Express();

// Initiate and use middlewares here
app.use(Express.urlencoded());
app.use(Express.json());

// Activate Cors and register to allow multiple CORS origin urls
app.use(Cors({ origin: [util.DEV_ORIGIN, util.PROD_ORIGIN] }));

// GET: endpoint to get Top Posts and sorted ascendingly based on number of comments
app.use(routes);

// Catch All middleware for other undefined middlewares under Not Found category
app.use((err, req, res, send) => {
  // respond page not found
  res.status(404).send("404: Page not found");
});

// Initiate Server
app.listen(PORT, () => {
  console.log(`Server is online on PORT: http://localhost:${PORT}`);
});
