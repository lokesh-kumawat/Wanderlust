const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
// const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

const listingController = require("../controllers/listing.js")


// index route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route
router.get("/:id", wrapAsync(listingController.showListing));

// Create Route
router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
router.post("/", (req, res) => {
    res.send(req.file);
});

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;