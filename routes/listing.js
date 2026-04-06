const express = require("express");
const router = express.Router();



const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
// const passport = require("passport");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });



// router.route use only one time use a path of any route....


router
.route("/")
.get( wrapAsync(listingController.index))
.post( 
    isLoggedIn,

  upload.single('listing[image]'),
    validateListing,
  wrapAsync(listingController.createListing)
);

//New Route for login 
router.get("/new", isLoggedIn, listingController.renderNewForm)


//Show Route
router
.route("/:id")
.get(
    // isLoggedIn,
    wrapAsync (listingController.showListing))
    .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),


    validateListing,
    wrapAsync(listingController.renderUpdateListing))
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.Deletelisting));

//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
 wrapAsync (listingController.renderEditForm));



 // controllers/listings.js

// already declared at top:


// existing controller functions...
// ...

// Add this at the bottom (without re-declaring Listing)
module.exports.index = async (req, res) => {
  const { category, search } = req.query; // get query params

  let query = {};

  if (category) {
    query.category = category; // filter by category
  }

  if (search) {
    query.title = { $regex: search, $options: "i" }; // search by title
  }

  const allListing = await Listing.find(query);
  res.render("listings/index", { allListing, currUser: req.user });
};


module.exports = router;