const express = require("express");
const app = express();
const path = require("path");

// Force https
const env = process.env.NODE_ENV || "development";
const forceSsl = function (req, res, next) {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(301, ["https://", req.get("Host"), req.url].join(""));
  }
  return next();
};

if (env === "production") {
  app.use(forceSsl);
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/build"));

// Redirect direct URLs back to index so React may then route them properly
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
