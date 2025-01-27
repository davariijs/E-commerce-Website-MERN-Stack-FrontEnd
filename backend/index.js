const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route handlers
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const infoAccountRoutes = require('./routes/infoAccountRoutes');
const checkOutRoutes = require('./routes/checkOutCartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://narjesdavari0:sEV1fFf6QwEgH04k@shoply-cluster.kmukf.mongodb.net/?retryWrites=true&w=majority&appName=shoply-cluster', {
    dbName: 'shoply',
}).catch(error => console.log(error));

// Routes
app.use('/add-wishlist', wishlistRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/info-account', infoAccountRoutes);
app.use('/check-out', checkOutRoutes);

// Root route
app.get('/', (req, res) => {
    res.send("App is Working");
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});










// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://narjesdavari0:sEV1fFf6QwEgH04k@shoply-cluster.kmukf.mongodb.net/?retryWrites=true&w=majority&appName=shoply-cluster', {
//     dbName: 'shoply',
// })
// .catch (error => console.log(error));
// const { CartSchema, UserSchema, WishlistSchema, InfoAccountSchema } = require('./models/Schema');

// // Schema for users of app

// const Wishlist = mongoose.model('wishlists', WishlistSchema);
// Wishlist.createIndexes();

// const CheckOutList= mongoose.model('check-out', CartSchema);
// CheckOutList.createIndexes();

// const UserList= mongoose.model('userLists', UserSchema);
// UserList.createIndexes();

// const InfoAccountList = mongoose.model('infoAccountLists', InfoAccountSchema);
// InfoAccountList.createIndexes();

// const CartCheckList= mongoose.model('cartCheckLists', CartSchema);
// CartCheckList.createIndexes();

// // For backend and express
// const express = require('express');
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {

//     resp.send("App is Working");
// });

// app.post("/add-wishlist", async (req, res) => {
//     const { title, image, price, uid } = req.body;
//     console.log("Request body:", req.body);
  
//     try {
//       const wishlist = new Wishlist({ title, image, price, uid });
//       await wishlist.save();
//       res.status(201).json(wishlist);
//     } catch (error) {
//         console.error("Error saving wishlist item:", error); // Log the error to see more details
//         res.status(500).json({ error: "Failed to add to wishlist" });
//     }
//   });

//   app.get("/add-wishlist/:uid", async (req, res) => {
//     const { uid } = req.params;
  
//     try {
//         const wishlists = await Wishlist.find({ uid: uid });
//         res.status(200).json(wishlists);
//     } catch (error) {
//         console.error("Error fetching wishlists by uid:", error);
//         res.status(500).json({ error: "Failed to fetch wishlists" });
//     }
//   });

//   app.delete("/add-wishlist/:id", async (req, res) => {
//     const { id } = req.params; // Get the item ID from the request parameters

//     try {
//         const deletedItem = await Wishlist.findByIdAndDelete(id); // This removes the item by its ID
//         if (!deletedItem) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.status(200).json({ message: 'Item removed from wishlist' });
//     } catch (error) {
//         console.error("Error removing wishlist item:", error);
//         res.status(500).json({ error: 'Failed to remove item from wishlist' });
//     }
// });

// app.post("/cart-checkout", async (req, res) => {
//     const { title, image, price,webID, color,quantity, uid } = req.body;
//     console.log("Request body:", req.body);
//     try {
//       const cartList = new CheckOutList({ title, image, price,webID, color,quantity });
//       await cartList.save();
//       res.status(201).json(cartList);
//     } catch (error) {
//         console.error("Error saving CartList item:", error); // Log the error to see more details
//         res.status(500).json({ error: "Failed to add to CartList" });
//     }
//   });

//   app.get("/cart-checkout", async (req, res) => {
//     try {
//       const cartListItems = await CheckOutList.find();
//       res.status(200).json(cartListItems);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch cartList" });
//     }
//   });

//   app.delete("/cart-checkout/:id", async (req, res) => {
//     const { id } = req.params; // Get the item ID from the request parameters

//     try {
//         const deletedItem = await CheckOutList.findByIdAndDelete(id); // This removes the item by its ID
//         if (!deletedItem) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.status(200).json({ message: 'Item removed from CartList' });
//     } catch (error) {
//         console.error("Error removing CartList item:", error);
//         res.status(500).json({ error: 'Failed to remove item from CartList' });
//     }
// });


// app.post("/user", async (req, res) => {
//   console.log("Incoming request body:", req.body);

//   const { email, name, uid } = req.body;

//   // Validate the request body
//   if (!email || !uid) {
//     return res.status(400).json({ error: "Email and UID are required" });
//   }

//   try {
//     const userList = new UserList({ email, name, uid });
//     await userList.save();
//     res.status(201).json(userList);
//   } catch (error) {
//     console.error("Error saving userList item:", error);
//     res.status(500).json({ error: "Failed to add to userList" });
//   }
// });

// app.get("/user", async (req, res) => {
//   try {
//     const userListItems = await UserList.find();
//     res.status(200).json(userListItems);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch userList" });
//   }
// });

// app.post("/info-account", async (req, res) => {
//   const { firstName, lastName, country,company,street,apt,city,state,number,postalCode,instruction,shipping,billing, uid } = req.body;
//   console.log("Request body:", req.body);

//   try {
//     const infoAccountList = new InfoAccountList({ firstName, lastName, country,company,street,apt,city,state,number,postalCode,instruction,shipping,billing, uid });
//     await infoAccountList.save();
//     res.status(201).json(infoAccountList);
//   } catch (error) {
//       console.error("Error saving infoAccountList item:", error); // Log the error to see more details
//       res.status(500).json({ error: "Failed to add to infoAccountList" });
//   }
// });

// app.get("/info-account/:uid", async (req, res) => {
//   const { uid } = req.params;

//   try {
//       const accounts = await InfoAccountList.find({ uid: uid });
//       res.status(200).json(accounts);
//   } catch (error) {
//       console.error("Error fetching accounts by uid:", error);
//       res.status(500).json({ error: "Failed to fetch accounts" });
//   }
// });

// app.delete("/info-account/:id", async (req, res) => {
//   const { id } = req.params; // Get the item ID from the request parameters

//   try {
//       const deletedItem = await InfoAccountList.findByIdAndDelete(id); // This removes the item by its ID
//       if (!deletedItem) {
//           return res.status(404).json({ message: 'Item not found' });
//       }
//       res.status(200).json({ message: 'Item removed from InfoAccountList' });
//   } catch (error) {
//       console.error("Error removing InfoAccountList item:", error);
//       res.status(500).json({ error: 'Failed to remove item from InfoAccountList' });
//   }
// });

// app.put("/info-account/:id", async (req, res) => {
//   const { id } = req.params; // Get the `id` from the request parameters
//   const updateData = req.body; // Get the data to update

//   try {
//     // Log id and update data for debugging
//     console.log("Updating document with ID:", id);
//     console.log("Update Data:", updateData);

//     // Validate the id format before querying
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ID format" });
//     }

//     // No need to manually convert `id` to ObjectId
//     const updatedInfo = await InfoAccountList.findByIdAndUpdate(
//       id, // Mongoose will automatically cast the string `id` to ObjectId
//       updateData,
//       { new: true, upsert: false } // Return the updated document
//     );

//     if (updatedInfo) {
//       res.status(200).json(updatedInfo); // Successfully updated
//     } else {
//       res.status(404).json({ error: "Document not found" }); // Document not found
//     }
//   } catch (error) {
//     console.error("Error updating document:", error); // Log the error
//     res.status(500).json({ error: "Failed to update document" }); // Return 500 if something goes wrong
//   }
// });



// app.post("/cart", async (req, res) => {
//   const { uid, item } = req.body;

//   try {
//     // Find the cart by user ID
//     let cart = await CartCheckList.findOne({ uid });

//     if (!cart) {
//       // If no cart exists for the user, create a new one
//       cart = new CartCheckList({ uid, items: [] });
//     }

//     // Check if the item already exists in the cart
//     const existingItemIndex = cart.items.findIndex(
//       (cartItem) =>
//         cartItem.webID === item.webID && cartItem.color === item.color
//     );

//     if (existingItemIndex > -1) {
//       // If the item exists, increment its quantity
//       cart.items[existingItemIndex].quantity += item.quantity || 1;
//     } else {
//       // If the item doesn't exist, add it to the cart
//       cart.items.push({
//         title: item.title,
//         image: item.image,
//         price: item.price,
//         color: item.color,
//         quantity: item.quantity || 1, // Default quantity to 1
//         webID: item.webID, // Use consistent naming
//       });
//     }

//     // Save the cart to the database
//     await cart.save();

//     res.status(200).json({
//       message: "Product added to cart successfully",
//       cart: cart, // Return the entire updated cart
//     });
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     res.status(500).json({ message: "Failed to add product to cart", error });
//   }
// });

// // GET: Retrieve cart
// app.get('/cart/:uid', async (req, res) => { // Change from userId to uid
//   const cart = await CartCheckList.findOne({ uid: req.params.uid });
//   res.status(200).json(cart);
// });

// // PUT: Increase item quantity in cart
// app.put('/cart/increase/:uid/:itemId', async (req, res) => {
//   const { uid, itemId } = req.params;

//   try {
//       const cart = await CartCheckList.findOne({ uid });

//       if (!cart) {
//           return res.status(404).json({ message: 'Cart not found' });
//       }

//       const id = new mongoose.Types.ObjectId(itemId); // Convert to ObjectId

//       const item = cart.items.find((item) => item._id.equals(id));
//       if (!item) {
//           return res.status(404).json({ message: 'Item not found in cart' });
//       }

//       item.quantity += 1; // Increment quantity
//       await cart.save();

//       return res.status(200).json({ cart });
//   } catch (error) {
//       console.error("Error increasing item quantity:", error);
//       return res.status(500).json({ message: 'Failed to increase item quantity' });
//   }
// });

// // PUT: Decrease item quantity in cart
// app.put('/cart/decrease/:uid/:itemId', async (req, res) => {
//   const { uid, itemId } = req.params;

//   try {
//       const cart = await CartCheckList.findOne({ uid });

//       if (!cart) {
//           return res.status(404).json({ message: 'Cart not found' });
//       }

//       const id = new mongoose.Types.ObjectId(itemId); // Convert to ObjectId

//       const item = cart.items.find((item) => item._id.equals(id));
//       if (!item) {
//           return res.status(404).json({ message: 'Item not found in cart' });
//       }

//       // Decrease quantity or remove item if quantity is 1
//       if (item.quantity > 1) {
//           item.quantity -= 1;
//       } else {
//           cart.items = cart.items.filter((item) => !item._id.equals(id));
//       }

//       await cart.save();

//       return res.status(200).json({ cart });
//   } catch (error) {
//       console.error("Error decreasing item quantity:", error);
//       return res.status(500).json({ message: 'Failed to decrease item quantity' });
//   }
// });


// // DELETE: Remove item from cart
// app.delete('/cart/:uid/:id', async (req, res) => {
//   const { uid, id } = req.params;

//   try {
//     console.log(`Deleting item with id: ${id} from cart of user: ${uid}`);

//     // Find the cart associated with the user ID
//     const cart = await CartCheckList.findOne({ uid });

//     if (!cart) {
//       console.log(`No cart found for user: ${uid}`);
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Log current items for debugging
//     console.log(`Cart items before filtering: ${JSON.stringify(cart.items)}`);
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       console.log(`Invalid ObjectId: ${id}`);
//       return res.status(400).json({ message: 'Invalid item ID' });
//     }
//     // Convert id from string to ObjectId
//     const itemId = new mongoose.Types.ObjectId(id); // Use 'new' here

//     // Check if the item exists before filtering
//     const itemExists = cart.items.some((item) => item._id.equals(itemId)); // Use equals() for comparison
//     if (!itemExists) {
//       console.log(`Item with id: ${itemId} not found in cart items.`);
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }

//     // Filter out the item by its ObjectId
//     cart.items = cart.items.filter((item) => !item._id.equals(itemId)); // Use equals() for filtering

//     // Save the updated cart
//     await cart.save();

//     console.log(`Successfully removed item with id: ${itemId} from user: ${uid}'s cart`);
//     return res.status(200).json({ message: 'Item removed successfully' });
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//     return res.status(500).json({ message: 'Failed to remove item from cart' });
//   }
// });

// app.listen(5000);