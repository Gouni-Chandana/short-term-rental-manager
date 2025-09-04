import Listing from "../models/Listing.js";

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error: error.message });
  }
};

// Get single listing by ID
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listing", error: error.message });
  }
};

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error creating listing", error: error.message });
  }
};

// Delete a listing
export const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing", error: error.message });
  }
};

// Add a review to a listing
export const addReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });

    listing.reviews.push(req.body.review);
    await listing.save();
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};
