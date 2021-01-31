// we are using express here to
const express = require("express");
// router portion of express
const router = express.Router();

// create a route : use get action to get a route 
router.get("/", (req, res) => {
    res.render("index");
})

module.exports = router;