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
    uid: {
        type: String,
        required: true,
    }
});

const CartSchema = new mongoose.Schema({
    uid: String,
    items: [
        {
        title: String,
        image: String,
        price: String,
        color: String,
        quantity: { type: Number, default: 1 },
        webID: Number,
        }
    ]
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
        default: "Anonymous",
    },
    uid: {
        type: String,
        required: true,
    }
});

const InfoAccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: true,
    },
    apt: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    instruction: {
        type: String,
        required: false,
    },
    shipping: {
        type: Boolean,
        required: false,
    },
    billing: {
        type: Boolean,
        required: false,
    },
    uid: {
        type: String,
        required: true,
    }
});

module.exports = { CartSchema, UserSchema, WishlistSchema, InfoAccountSchema}