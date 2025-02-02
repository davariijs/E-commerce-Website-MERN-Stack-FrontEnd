import express, { Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { IUserState } from '../types';
const router = express.Router();
const { UserSchema } = require('../models/Schema');

const UserList: Model<IUserState> = mongoose.model<IUserState>('userLists', UserSchema);

// POST /user - Add user
    router.post("/", async (req:Request, res:Response): Promise<void> => {
        console.log("Incoming request body:", req.body);
    
        const { email, name, uid } = req.body;
    
        // Validate the request body
        if (!email || !uid) {
        res.status(400).json({ error: "Email and UID are required" });
        return;
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
    
    router.get("/", async (req:Request, res:Response): Promise<void> => {
        try {
        const userListItems = await UserList.find();
        res.status(200).json(userListItems);
        } catch (error) {
        res.status(500).json({ error: "Failed to fetch userList" });
        }
    });

    export default router;