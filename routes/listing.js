const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))//Index Route
.post(isLoggedIn,validateListing,upload.single("listing[image]"), wrapAsync(listingController.createListing)); //create route


router.route("/search")
.get(listingController.searchListings)  //search Route

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))  //show Route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))  //update route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));  //delete route



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;
