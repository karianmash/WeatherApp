const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

// telling my app to use ejs as the default template engine
app.set("view engine", "ejs");

// body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// code to serve the static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { data: "" });
});

app.post("/", (req, res) => {
  const location = req.body.location ? req.body.location : "Purnia";
  const appId = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    appId +
    "&units=metric";
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render("index", { data: weatherData });
      });
    } else {
      res.render("index", { data: "0" });
    }
  });
});

app.listen(process.env.PORT || 80);
