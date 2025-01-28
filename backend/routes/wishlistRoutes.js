const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { WishlistSchema } = require('../models/Schema');

const Wishlist = mongoose.model('wishlists', WishlistSchema);

    router.post("/", async (req, res) => {
        const { title, image, price,pathname, uid } = req.body;
        console.log("Request body:", req.body);
    
        try {
        const wishlist = new Wishlist({ title, image, price, pathname, uid });
        await wishlist.save();
        res.status(201).json(wishlist);
        } catch (error) {
            console.error("Error saving wishlist item:", error); // Log the error to see more details
            res.status(500).json({ error: "Failed to add to wishlist" });
        }
    });

    router.get("/:uid", async (req, res) => {
        const { uid } = req.params;
    
        try {
            const wishlists = await Wishlist.find({ uid: uid });
            res.status(200).json(wishlists);
        } catch (error) {
            console.error("Error fetching wishlists by uid:", error);
            res.status(500).json({ error: "Failed to fetch wishlists" });
        }
    });

    router.delete("/:id", async (req, res) => {
        const { id } = req.params; // Get the item ID from the request parameters

        try {
            const deletedItem = await Wishlist.findByIdAndDelete(id); // This removes the item by its ID
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json({ message: 'Item removed from wishlist' });
        } catch (error) {
            console.error("Error removing wishlist item:", error);
            res.status(500).json({ error: 'Failed to remove item from wishlist' });
        }
    });

module.exports = router;