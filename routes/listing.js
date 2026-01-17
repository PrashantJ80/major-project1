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


module.exports = router;