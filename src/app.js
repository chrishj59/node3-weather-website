const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //path to non standard express view
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // new path for hbs viewspages
hbs.registerPartials(partialsPath); //HBS path to partials
//set up express static directory
app.use(express.static(publicDirectoryPath));

// never called as index is special name if there is no path so this is never called
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chris"
  }); // hbs viws and attributes included in the view
  //   res.send("<h1>Weather app</h1>");
});

// for help page
app.get("/help", (req, res) => {
  //   // express identifies as object and strinfy jsonj
  //   res.send({ name: "Chris", age: 59 });
  res.render("help", {
    title: "Help",
    title: "Help",
    name: "Chris",
    message: "Help message"
  });
});

app.get("/about", (req, res) => {
  //  res.send("<h1>About weather app </h1>");
  res.render("about", {
    title: "About",
    name: "Chris"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(address, (error, { latitude = null, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    if (!latitude) {
      return res.send({
        error: "Address is unknown. Please try another address"
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term!!" });
  }
  console.log("query string: ", req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  // help child page not found
  res.render("404", {
    title: "Help Article error",
    name: "Chris",
    nfMessage: "Help article not found "
  });
});

app.get("*", (req, res) => {
  // catch all if not matched above
  res.render("404", {
    title: "Page not found",
    name: "Chris",
    nfMessage: "Page not found "
  });
});

// lart the app should and lsitem on port xxxx
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
