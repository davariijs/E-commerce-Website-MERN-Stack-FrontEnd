const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://narjesdavari0:sEV1fFf6QwEgH04k@shoply-cluster.kmukf.mongodb.net/?retryWrites=true&w=majority&appName=shoply-cluster', {
    dbName: 'shoply',
})
.catch (error => console.log(error));

const WishlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

const CartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    webID: {
        type: Number,
        required: true,
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    uid: {
        type: String,
        required: true,
    }
});

module.exports = { CartSchema, UserSchema, WishlistSchema}