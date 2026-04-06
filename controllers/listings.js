const Listing = require("../models/listing");


module.exports.index = async (req, res) => {
    const { category, search } = req.query; // get category and search from query
    let query = {};

    if (category) {
        query.category = category; // filter by category
    }

    if (search) {
        query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    const allListing = await Listing.find(query);
    res.render("listing/index.ejs", { allListing, currUser: req.user });
};



module.exports.renderNewForm = (req,res) => {
    // console.log(req.user);
    if(!req.isAuthenticated()) {
        req.flash("error", "You Must be logged in to create listing");
        return res.redirect("/login");
    }
   
    res.render("listing/new.ejs")
};

module.exports.showListing = async (req, res) => {
    // const __id = req.params; // Removes extra spaces
const id = req.params.id.trim(); 
const listing = await Listing.findById(id)
.populate({path: "reviews", populate: {
    path: "author",
}})
.populate("owner");
if(!listing) {

     req.flash("Error", " Listing you requested does not exist!");
     return res.redirect("/listings");
     

};
    // let {id} = req.params; //get id
    
//    const listing = await Listing.findById(__id);
console.log(listing);
   res.render("listing/show", { listing })
};

module.exports.createListing = async (req, res) => {
   let url =  req.file.path;
   let filename = req.file.filename;
   console.log(url, "..",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Was Created!");
    return res.redirect("/listings");
  };

  module.exports.renderEditForm = async (req, res) => {
  const id = req.params.id.trim(); 
  const listing = await Listing.findById(id);
  if(!listing) {
       req.flash("Error", " Listing you requested does not exist!");
       return res.redirect("/listings");
  };

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
  res.render("listing/edit.ejs",{listing, originalImageUrl });
  };

  module.exports.renderUpdateListing = async (req,res) => {
      const id= req.params.id.trim(); 
    //   let listing = await Listing.findById(id);
      let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     
    if(typeof req.file !== "undefined") {
    let url =  req.file.path;
    let filename = req.file.filename;
     listing.image = {url, filename};
     await listing.save();
      }

      req.flash("Success", " Listing Was Updated!");
      res.redirect(`/listings/${id}`);
  };

  module.exports.Deletelisting = async(req,res) => {
    const id = req.params.id.trim();
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("Success", "Listing Was Deleted!");
    res.redirect("/listings");

}