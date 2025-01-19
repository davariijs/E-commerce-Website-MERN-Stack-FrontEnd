const mongoose = require('mongoose');
mongoose.connect(process.env.REACT_APP_URI_MONGODB , {
    dbName: 'shoply',
})
.catch (error => console.log(error));

export const CartSchema = new mongoose.Schema({
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
    Quantity: {
        type: Number,
        required: true,
    },
});