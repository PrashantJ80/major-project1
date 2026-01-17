const Review = require("./models/review.js");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const {  reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req,res,next) => {
    
    if(!req.isAuthenticated()) {
        // redirectedUrl 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listings");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req , res, next) => {
    const id= req.params.id.trim(); 
    let listing = await Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)) {
       req.flash("error" , "You Are Not The Owner of The listing");
      return res.redirect(`/listings/${id}`);
    }




    next();
};


//Crate a  validate listing function
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    
if(error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);  // Pass the string message instead
} else {
    next();
}};

// for review
module.exports.validateReview = (req, res, next) => {
      console.log(req.body);
      if (req.body.review && req.body.review.rating) {
    // Convert string or array to a number
req.body.review.rating = Array.isArray(req.body.review.rating)
    ? parseInt(req.body.review.rating[req.body.review.rating.length - 1], 10)
    : parseInt(req.body.review.rating, 10);

}

    let {error} = reviewSchema.validate(req.body);

    
if(error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);  // Pass the string message instead
} else {
    next();
}};


module.exports.isReviewAuthor = async (req , res, next) => {
    // const {id,reviewId} = req.params.id.trim(); 
    const { id, reviewId } = req.params; // 
    const review = await Review.findById(reviewId);


    if(!review.author._id.equals(res.locals.currUser._id)) {
       req.flash("error" , "You Are Not The author of The review");
      return res.redirect(`/listings/${id}`);
    }




    next();
};