import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  reviews: [{ type: String }],
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;   // 👈 Important: default export
