const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
// dotenv as in the .env file where our key is securely stored
require("dotenv").config();

router.get("/", (req, res) => {
  console.log("Inside get route");
  //   request to 3rd party API
  axios
    .get(
      // string interpolation, add variable from .env after key=
      //   adding process.env. makes this key available for a host (like Heroku)
      `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=2&rating=pg`
    )
    // okay to write this: (http://api.giphy.com/v1/gifs/trending?api_key=hP1UhTKe17KqI8SL7vu2JAmSBySgWF03&limit=2&rating=pg)
    // here in the get for testing and notes, but API needs to be taken out before commiting
    // Needs to go in a .env, which is like a .gitignore in a way
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("Error with get", err);
      res.send(500);
    });
});

module.exports = router;
