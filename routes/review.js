const express = require("express");
// const router = express.Router();
// const Review = require("./models/review");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
// const { createReview } = require("../controllers/reviewss.js");
const router = require('express').Router({ mergeParams: true }); // ✅ Important

const reviewController = require("../controllers/reviews.js");
// Reviews 
// Post Route


router.post("/", 
    isLoggedIn,
    validateReview, wrapAsync(reviewController.createReview));


// Delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync(reviewController.destroyReview))

module.exports = router;
