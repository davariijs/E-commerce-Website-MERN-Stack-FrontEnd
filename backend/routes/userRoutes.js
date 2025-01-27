const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { UserSchema } = require('../models/Schema');

const UserList = mongoose.model('userLists', UserSchema);

// POST /user - Add user
    router.post("/", async (req, res) => {
        console.log("Incoming request body:", req.body);
    
        const { email, name, uid } = req.body;
    
        // Validate the request body
        if (!email || !uid) {
        return res.status(400).json({ error: "Email and UID are required" });
        }
    
        try {
        const userList = new UserList({ email, name, uid });
        await userList.save();
        res.status(201).json(userList);
        } catch (error) {
        console.error("Error saving userList item:", error);
        res.status(500).json({ error: "Failed to add to userList" });
        }
    });
    
    router.get("/", async (req, res) => {
        try {
        const userListItems = await UserList.find();
        res.status(200).json(userListItems);
        } catch (error) {
        res.status(500).json({ error: "Failed to fetch userList" });
        }
    });

    module.exports = router;