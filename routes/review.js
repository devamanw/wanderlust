const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const controllerReview = require("../controller/reviews.js");


//review routes
router.post("/",isLoggedIn,validateReview,wrapAsync(controllerReview.createReview));
//review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(controllerReview.destroyReview));

module.exports = router;
