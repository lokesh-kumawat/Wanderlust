const Listing = require("../models/listing")

// for index router
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
}


// open new form
module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
}

// show listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}


// create route for listing
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    // you must be logged in to create listing
    // if(!req.isAuthenticated()){
    //     req.flash("error", 'you must be logged in to create listing');
    //     res.redirect("/listing");
    // }
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}

// edit route for listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

// Update route for listing
module.exports.updateListing = async (req, res) => {
    // const currUser = res.locals.currUser;
    let { id } = req.params;
    let updatedVal = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id, updatedVal);

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save()
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}


// delete route for listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
}






