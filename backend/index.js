const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://narjesdavari0:sEV1fFf6QwEgH04k@shoply-cluster.kmukf.mongodb.net/?retryWrites=true&w=majority&appName=shoply-cluster', {
    dbName: 'shoply',
})
.catch (error => console.log(error));
const { CartSchema, UserSchema, WishlistSchema } = require('./Schema');

// Schema for users of app

const Wishlist = mongoose.model('wishlists', WishlistSchema);
Wishlist.createIndexes();

const CartList= mongoose.model('cartLists', CartSchema);
CartList.createIndexes();

const UserList= mongoose.model('userLists', UserSchema);
UserList.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
});

app.post("/add-wishlist", async (req, res) => {
    const { title, image, price, uid } = req.body;
    console.log("Request body:", req.body);
  
    try {
      const wishlist = new Wishlist({ title, image, price, uid });
      await wishlist.save();
      res.status(201).json(wishlist);
    } catch (error) {
        console.error("Error saving wishlist item:", error); // Log the error to see more details
        res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  app.get("/add-wishlist", async (req, res) => {
    try {
      const wishlistItems = await Wishlist.find();
      res.status(200).json(wishlistItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  app.delete("/add-wishlist/:id", async (req, res) => {
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

app.post("/cart-checkout", async (req, res) => {
    const { title, image, price,webID, color,quantity } = req.body;
    console.log("Request body:", req.body);
    try {
      const cartList = new CartList({ title, image, price,webID, color,quantity });
      await cartList.save();
      res.status(201).json(cartList);
    } catch (error) {
        console.error("Error saving CartList item:", error); // Log the error to see more details
        res.status(500).json({ error: "Failed to add to CartList" });
    }
  });

  app.get("/cart-checkout", async (req, res) => {
    try {
      const cartListItems = await CartList.find();
      res.status(200).json(cartListItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cartList" });
    }
  });

  app.delete("/cart-checkout/:id", async (req, res) => {
    const { id } = req.params; // Get the item ID from the request parameters

    try {
        const deletedItem = await CartList.findByIdAndDelete(id); // This removes the item by its ID
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item removed from CartList' });
    } catch (error) {
        console.error("Error removing CartList item:", error);
        res.status(500).json({ error: 'Failed to remove item from CartList' });
    }
});


app.post("/user", async (req, res) => {
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

app.get("/user", async (req, res) => {
  try {
    const userListItems = await UserList.find();
    res.status(200).json(userListItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch userList" });
  }
});
app.listen(5000);