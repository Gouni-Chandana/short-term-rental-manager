import express from "express";
import { 
  getAllListings, 
  getListing, 
  createListing, 
  deleteListing, 
  addReview 
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getAllListings);
router.get("/:id", getListing);
router.post("/", createListing);
router.delete("/:id", deleteListing);
router.post("/:id/reviews", addReview);

export default router;
