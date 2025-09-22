const Review = require("../models/review.js");
const Listing = require("../models/listings.js");

module.exports.createReview = async(req,res)=>{
    console.log(req.params.id);
     let listing = await Listing.findById(req.params.id);
     let newReview = new Review(req.body.review);
     newReview.author = req.user._id;
     listing.reviews.push(newReview._id);
     await newReview.save();
     await listing.save();
     req.flash("success","New Review created successfully");
     res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async(req,res)=>{
let {id,reviewId}=req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success","Review delete successfully");
res.redirect(`/listings/${id}`);
}

